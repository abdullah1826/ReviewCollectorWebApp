import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../Pages/ManageProfile.module.css";
import { IoCopyOutline } from "react-icons/io5";
import coverpic from "../assets/images/coverP.png";
import profilepic from "../assets/images/profileP.png";
import axios from "axios";
import { getDatabase, ref, get, update } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { MdCameraAlt } from "react-icons/md";
import Swal from "sweetalert2";
import { IoSearch } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

const ManageProfile = () => {
  const navigate = useNavigate();
  const db = getDatabase(); // Initialize Firebase database
  const storage = getStorage();
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const [userData, setUserData] = useState({
    businessName: "",
    phone: "",
    reviewLink: "",
    businessPageLink: "",
    email: "",
    profileUrl: "",
    coverUrl: "",
  });

  const handleSearch = async (input) => {
    console.log("Input value:", input); 

    if (input.trim() === "") {
      console.log("Input is empty"); 
     setTimeout(() => {
      setResults([]); 
     }, 1500);
      setError(""); 
      return;
    }

    try {
      const response = await axios.post(
        "https://reviews-collector.kameti.pk/api/getPlaces",
        {
          text: input, // Dynamic input
          token: "23r32wr3w4royte875dw3drfq3xr", // Your static token
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setResults(response.data?.predictions); // Update results state
      // console.log("Fetched Results:", );
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching places:", err);
      setError("Failed to fetch places. Please try again.");
      setResults([]); // Clear results on error
    }
  };


  const handleSelectPlace = (place) => {

    let placeName = place.structured_formatting.main_text.split(",")[0] || "Unknown Place";
    let businessAddress = place.structured_formatting.secondary_text.split(",")[0] || "";
    setUserData((prev) => ({
      ...prev,
      businessName: placeName +", "+ businessAddress,
      place_id: place.structured_formatting.main_text, // Add place_id from the place
      reviewLink:  `https://search.google.com/local/writereview?placeid=${place.place_id}`,
      businessPageLink: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.place_id}`,
    }));
    setQuery("");
    setResults([]);
  };

  useEffect(() => {
    const uid = localStorage.getItem("useruid");
    console.log(uid);
    if (!uid) {
      console.error("No UID found in localStorage.");
      return;
    }

    const fetchUserData = async () => {
      const userRef = ref(db, `User/${uid}`);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.error("No data available for this user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle change for form fields if editing is allowed
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file, type) => {
    const uid = localStorage.getItem("useruid"); // Ensure UID is fetched
    if (!uid || !file) {
      console.error("UID or file is missing.");
      return;
    }

    try {
      console.log(`Uploading ${type}...`);

      // Use the original file name or a sanitized version with the UID
      const fileName = `${uid}_${file.name}`;
      const fileRef = storageRef(storage, `/profileImages/${fileName}`);

      // Upload file directly to Firebase Storage
      await uploadBytes(fileRef, file);
      console.log(`Upload complete for ${type}.`);

      // Get the file's download URL
      const downloadURL = await getDownloadURL(fileRef);
      console.log(`${type} download URL:`, downloadURL);

      // Update the user's data in Firebase Realtime Database
      const userRef = ref(db, `User/${uid}`);
      await update(userRef, { [type]: downloadURL });

      // Update local state with Firebase Storage URL
      setUserData((prev) => ({ ...prev, [type]: downloadURL }));
      console.log(`${type} updated successfully in database.`);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Preview
      setUserData((prev) => ({ ...prev, profileUrl: previewUrl })); // Set preview in state
      handleImageUpload(file, "profileUrl");
    }
  };

  const handleCoverPicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Preview
      setUserData((prev) => ({ ...prev, coverUrl: previewUrl })); // Set preview in state
      handleImageUpload(file, "coverUrl");
    }
  };

  const handleSaveChanges = async () => {
    const uid = localStorage.getItem("useruid");
    if (!uid) {
      console.error("No UID found in localStorage.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No user ID found. Please log in again.",
       
      });
      return;
    }

    const userRef = ref(db, `User/${uid}`);
    console.log(uid);
    try {
      await update(userRef, userData); // Update the user data in Firebase
      console.log("User data updated successfully!");

      // Show SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your data has been updated successfully!",
        confirmButtonText: "OK",
           customClass: {
                  confirmButton: styles.confirmButton, 
                },
      });
    } catch (error) {
      console.error("Error updating user data:", error);

      // Show SweetAlert error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue updating your data. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCopy = (text) => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => alert("Link copied to clipboard!"));
    } else {
      alert("No review link to copy!");
    }
  };
  return (
    <div className={styles.containerFluid}>
      <Navbar />
      <div className="container">
        <button className={styles.backbtn} onClick={handleBack}>
          Back
        </button>
        {/* Header Image */}
        <div className="row">
          <div className="col-md-12" style={{ position: "relative" }}>
            <div className={styles.profileSection}>
              <div className={styles.coverImage}>
                <img
                  src={userData?.coverUrl || coverpic}
                  alt="Cover"
                  onClick={() =>
                    document.getElementById("cover-pic-upload").click()
                  }
                />
                <MdCameraAlt
                  className={styles.editCoverIcon}
                  onClick={() =>
                    document.getElementById("cover-pic-upload").click()
                  }
                />
                <input
                  type="file"
                  id="cover-pic-upload"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleCoverPicChange}
                />
              </div>
              <h1></h1>
              <div className={styles.profile}>
                <div>
                  <img
                    src={userData?.profileUrl || profilepic}
                    alt="Profile"
                    style={{
                      width: "105px",
                      height: "105px",
                      objectFit: "cover",
                      borderRadius: "26%",
                      border: "5px solid rgb(255 255 255)",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      document.getElementById("profile-pic-upload").click()
                    }
                  />
                  <div className={styles.editOverlay}>
                    <MdCameraAlt
                      className="edit-icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering parent click
                        document.getElementById("profile-pic-upload").click();
                      }}
                      aria-label="Edit Profile Picture"
                      title="Edit Profile Picture"
                    />
                  </div>
                </div>
                <input
                  type="file"
                  id="profile-pic-upload"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
              </div>

              <div style={{ position: "relative" }}>
      {/* Input and Search Icon */}
      <div style={{ width: "55%", float: "right", position: "relative" }}>
        <IoSearch
          style={{
            position: "absolute",
            left: "10px",
            top: "32px",
            fontSize: "24px",
            color: "#a4a4a4",
          }}
        />
        <input
          type="text"
          placeholder="Search for a place"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value); // Call API dynamically
          }}
          className={styles.inputSearch}
          style={{
            width: "100%",
            padding: "10px 40px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Results Dropdown */}
      {results.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "71px",
            right: "0",
            width: "55%",
            maxHeight: "200px",
            overflow: "auto",
            backgroundColor: "white",
            listStyle: "none",
            padding: "10px",
            margin: "0",
            zIndex: "100",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {results.map((place, index) => (
            <li
              key={index}
              style={{
                cursor: "pointer",
                padding: "8px 10px",
                borderBottom:
                  index !== results.length - 1 ? "1px solid #eee" : "none",
              }}
              onClick={() => handleSelectPlace(place)}
            >
              {place.description || place.display_name || `Place ${index + 1}`}
            </li>
          ))}
        </ul>
      )}

      {/* Error Message */}
      {error && (
        <p style={{ color: "red", position: "absolute", top: "100px" }}>
          {error}
        </p>
      )}
    </div>
            </div>
          </div>
        </div>
        {/* Input Form */}
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="businessName"
              value={userData.businessName}
              readOnly
              onChange={handleInputChange}
              placeholder="Business Name"
              className={styles.inputField}
            />
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <div style={{ width: "100%", position: "relative" }}>
              <input
                type="text"
                name="reviewLink"
                value={userData.reviewLink}
                onChange={handleInputChange}
                placeholder="Review Link"
                readOnly
                className={styles.inputField}
              />
              <button
                className={styles.iconButton}
                onClick={() => handleCopy(userData.reviewLink)}
              >
                <IoCopyOutline />
              </button>
            </div>
            <div style={{ width: "100%", position: "relative" }}>
              <input
                type="text"
                name="businessPageLink"
                value={userData.businessPageLink}
                onChange={handleInputChange}
                placeholder="Google Business Page Link"
                readOnly
                className={styles.inputField}
              />
              <button
                className={styles.iconButton}
                onClick={() => handleCopy(userData.businessPageLink)}
              >
                <IoCopyOutline />
              </button>
            </div>
          </div>
          <div className={styles.inputFullWidth}>
            <input
              type="text"
              name="email"
              readOnly
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className={styles.inputField}
            />
          </div>
          {/* Save Button */}
          <button className={styles.saveButton} onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;