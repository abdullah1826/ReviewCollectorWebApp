import { useState, useEffect } from "react";
import styles from "../Pages/Profile.module.css";
import Navbar from "../components/Navbar";
import { IoEyeSharp, IoQrCodeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
import { Tooltip } from "react-tooltip";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push, update, get } from "firebase/database";
import { query, orderByChild, equalTo } from "firebase/database";
import { CiCircleInfo } from "react-icons/ci";
import Swal from "sweetalert2";

// import coverpic from "../assets/images/image.jpg";
import coverpic from "../assets/images/coverP.png";
import profilepic from "../assets/images/profileP.png";
import QRCode from "react-qr-code";
import { CiEdit } from "react-icons/ci";

const Profile = () => {
  const navigate = useNavigate();
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [manageProfileModal, setshowManageProfileModal] = useState(false);
  const [newUserProfilePhoto, setNewUserProfilePhoto] = useState(coverpic);
  const [userRecords, setUserRecords] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [activeRecord, setActiveRecord] = useState(null);

  const userUid = localStorage.getItem("useruid");
  const shareData = `https://reviews-collector.kameti.pk/${userUid}`;

  const handleEditClick = () => {
    navigate("/manageProfile");
  };

  // const handleAddProfileClick = () => {
  //   setShowAddProfileModal(true);
  // };

  const handleShareClick = () => {
    setShowShareModal(true);
  };
  const handleManageProfileClick = () => {
    setshowManageProfileModal(true);
  };

  const closeModal = () => {
    setShowAddProfileModal(false);
    setShowShareModal(false);
    setshowManageProfileModal(false);
  };
  const handleNewProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewUserProfilePhoto(imageUrl);
      // setFormData(prev => ({ ...prev, profile_image: file }));
    }
  };

  useEffect(() => {
    // const initializeData =  () => {
    try {
      SetQrLinkType();
      fetchUserData();
    } catch (error) {
      console.error("Error during initialization:", error);
    }
    // };

    // initializeData();
  }, [userUid]);
  console.log(userUid);
  const SetQrLinkType = async () => {
    if (!userUid) {
      console.error("No user UID found in localStorage");
      return;
    }
    console.log("sedrf");
    // Fetch user data from Firebase Realtime Database
    const db = getDatabase();
    const userRef = ref(db, `User/${userUid}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          setUserData(data);
          setActiveRecord(data);
          setQrLinkType(data.qrLinkType || ""); // Set qrLinkType based on Firebase data
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  };
  const fetchUserData = async () => {
    const parentid = localStorage.getItem("parentid"); // Assuming the parentId is stored in localStorage

    if (!parentid) {
      console.error("No parentId found in localStorage");
      return;
    }

    // Initialize Firebase Database
    const db = getDatabase();

    // Reference to the User node
    const userRef = ref(db, "User");

    // Create a query to filter records where the 'parentId' field matches the localStorage value
    const userQuery = query(
      userRef,
      orderByChild("parentId"),
      equalTo(parentid)
    );

    // Fetch the data using the query
    get(userQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // console.log(data)

          const records = Object.keys(data).map((key) => ({
            ...data[key],
            uid: key,
          }));
          setUserRecords(records); // Store records in state
        } else {
          console.log("No matching records found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  // console.log(activeRecord)

  const [qrLinkType, setQrLinkType] = useState(""); // Local state for tracking selected option

  const handleRadioChange = async (newQrLinkType) => {
    setQrLinkType(newQrLinkType); // Update local state
    const userUid = localStorage.getItem("useruid"); // Get user UID from localStorage
    console.log(userUid);

    if (!userUid) {
      console.error("No user UID found in localStorage");
      return;
    }

    // Update qrLinkType in Firebase
    const db = getDatabase();
    try {
      await update(ref(db, `User/${userUid}`), { qrLinkType: newQrLinkType });
      console.log(`qrLinkType updated to: ${newQrLinkType}`);
    } catch (error) {
      console.error("Error updating qrLinkType in Firebase:", error.message);
    }
  };

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    businessName: "",
    phone: "",
    reviewLink: "",
    businessPageLink: "",
    profileUrl: "",
    coverUrl: "",
    parentId: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure Firebase is initialized
    const db = getDatabase();

    // Generate a new key for the user
    const userRef = ref(db, "User");
    const newUserRef = push(userRef);
    const pushKey = newUserRef.key;

    // Update Firebase with form values
    try {
      await update(ref(db, `User/${pushKey}`), {
        ...userData, // Use name and email from the form
        uid: pushKey, // Use pushKey as UID
        businessName: "", // Optional default
        phone: "",
        businessPageLink: "",
        coverUrl: "",
        deleted: false,
        qrLinkType: "survey",
        reviewLink: "",
        profileUrl: "",
        parentId: localStorage.getItem("parentid"),
      });
      console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data: ", error.message);
    }
  };

  const editUser = (id) => {
    localStorage.setItem("useruid", id);
    console.log(id);
    // if (storedUserId === id) {
    const selectUser = userRecords.find((user) => user.uid === id);

    if (selectUser) {
      setActiveRecord(selectUser);
      console.log(selectUser);
    } else {
      console.error("No user record found with the given ID in userRecords.");
    }
  };
  const handlePreviewClick = () => {
    const shareData = `https://reviews-collector.kameti.pk/${userUid}`;
    window.open(shareData, "_blank");
  };

  const handleShowManageProfile = () => {
    navigate("/manageProfile");
  };
  const handleCopyLink = (shareData) => {
    navigator.clipboard
      .writeText(shareData)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Link copied to clipboard!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Failed to copy the link.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className={styles.containerFluid} style={{ marginBottom: "20px" }}>
      <Navbar />
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-6" style={{ position: "relative" }}>
            <div className={styles.profileSection}>
              <div className={styles.coverImage}>
                <img src={userData?.coverUrl || coverpic} alt="Cover" />
              </div>
              <div className={styles.profile}>
                <img
                  src={userData?.profileUrl || profilepic}
                  alt="Profile"
                  style={{
                    width: "105px",
                    height: "105px",
                    objectFit: "cover",
                    borderRadius: "26%",
                    border: "5px solid rgb(255 255 255)",
                  }}
                />
              </div>

              <button
                className={styles.addprofile}
                onClick={handleShowManageProfile}
              >
                <CiEdit style={{ fontSize: "20px" }} /> Edit Profile
              </button>
              <div className={styles.profileDetails}>
                {/* <h4>{activeRecord?.name}</h4> */}
                <h3>{activeRecord?.businessName}</h3>
                <p>{activeRecord?.phone}</p>
                <p>{activeRecord?.email}</p>
              </div>
              <div className="text-center my-3">
                <button
                  className={styles.manageButton}
                  onClick={handleManageProfileClick}
                  disabled
                  style={{ display: "none" }}
                >
                  <IoSettingsSharp style={{ fontSize: "20px" }} />
                  Manage Profiles
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className={styles.actionButtons}>
              <button
                onClick={handlePreviewClick}
                className={`${styles.hoverEffect}`}
              >
                <p>Preview</p>
                <IoEyeSharp className={styles.icon} />
              </button>
              <button
                onClick={handleShareClick}
                className={`${styles.hoverEffect}`}
              >
                <p>Share</p>
                <IoQrCodeOutline className={styles.icon} />
              </button>
              <button
                onClick={handleEditClick}
                className={`${styles.hoverEffect}`}
              >
                <p>Edit</p>
                <FaRegEdit className={styles.icon} />
              </button>
            </div>

            <div className={styles.listGroup}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 20px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <CiCircleInfo
                    id="info-icon-direct"
                    style={{
                      fontSize: "36px",
                      color: "#000000b0",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  />
                  <Tooltip
                    anchorId="info-icon-direct"
                    content="This review type will be set to direct."
                  />
                  <span>Direct</span>
                </div>
                <input
                  type="radio"
                  name="fav_language"
                  style={{
                    width: "20px",
                    accentColor: "#1faa52", // Change the color of the radio button
                  }}
                  checked={qrLinkType === "direct"}
                  onChange={() => handleRadioChange("direct")}
                />
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 20px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <CiCircleInfo
                    id="info-icon-survey"
                    style={{
                      fontSize: "36px",
                      color: "#000000b0",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  />
                  <Tooltip
                    anchorId="info-icon-survey"
                    content="User will be taken to the survey page for the review."
                  />
                  <span>Enable survey</span>
                </div>
                <input
                  type="radio"
                  name="fav_language"
                  style={{
                    width: "20px",
                    accentColor: "#1faa52", // Change the color of the radio button
                  }}
                  checked={qrLinkType === "survey"}
                  onChange={() => handleRadioChange("survey")}
                />
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 20px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <CiCircleInfo
                    id="info-icon"
                    style={{
                      fontSize: "36px",
                      color: "#000000b0",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  />
                  <Tooltip
                    anchorId="info-icon"
                    content="This review link will be off."
                  />
                  <span>Turn review link off</span>
                </div>
                <input
                  type="radio"
                  name="fav_language"
                  style={{
                    width: "20px",
                    accentColor: "#1faa52", // Change the color of the radio button
                  }}
                  checked={qrLinkType === "off"}
                  onChange={() => handleRadioChange("off")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showAddProfileModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2>Add New Profile</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <IoIosClose />
              </button>
            </div>
            <div className="profile_pic">
              <div className="profile">
                <div
                  className="profile-wrapper"
                  onClick={() =>
                    document.getElementById("profile-new-pic-upload").click()
                  }
                >
                  <img
                    src={newUserProfilePhoto}
                    alt="Profile"
                    className="profile-photo"
                    style={{
                      width: "110px",
                      height: "110px",
                      objectFit: "cover",
                      borderRadius: "29%",
                      border: "5px solid #D9D9D9",
                    }}
                  />
                  {/* <div className={styles.profileOverlay}>
                <MdCameraAlt className="edit-icon"  />
                </div> */}
                </div>
                <input
                  type="file"
                  id="profile-new-pic-upload"
                  style={{ display: "none" }}
                  onChange={handleNewProfilePicChange}
                  accept="image/*"
                />
              </div>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input type="text" name="name" onChange={handleChange} required />

              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
              <button type="submit" className={styles.submitButton}>
                Create Profile
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Share Modal */}
      {showShareModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ width: "500px" }}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <div>
                <h2 style={{ textAlign: "center", fontSize: "30px" }}>
                  Share QR Code
                </h2>
                <p style={{ fontSize: "22px" }}>
                  Scan this QR Code to share your profile
                </p>
                <QRCode value={shareData} size={150} />
              </div>
            </div>
            <button
              className={styles.sharebtn}
              onClick={() => handleCopyLink(shareData)}
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
      {manageProfileModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.ProfilemodalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <p
              style={{ fontSize: "22px", fontWeight: "600", textAlign: "left" }}
            >
              All Users
            </p>
            <div style={{ marginTop: "30px" }}>
              <div className={styles.mainProfile}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex" }}>
                    <img src={coverpic} width="70" height="70" />

                    <div style={{ paddingLeft: "10px" }}>
                      <h4 style={{ float: "left" }}>
                        {activeRecord?.name}
                        <span style={{ fontSize: "17px" }}>
                          {activeRecord.parentId == activeRecord.uid &&
                            "(Main)"}
                        </span>
                      </h4>
                      <p style={{ textAlign: "left" }}>{activeRecord?.email}</p>
                    </div>
                  </div>
                </div>
                <hr></hr>
                {userRecords.map((user) => {
                  if (user?.uid === userUid) {
                    return null; // Skip rendering this user
                  }

                  return (
                    <li key={user.uid} style={{ listStyle: "none" }}>
                      {" "}
                      {/* Assuming 'uid' is unique */}
                      <div
                        className="User_Profile"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ display: "flex" }}>
                            {/* Use user's coverpic if available, fallback to a default */}
                            <img
                              src={user.coverpic || coverpic}
                              width="70"
                              height="70"
                              alt="User Cover"
                            />
                            <div style={{ paddingLeft: "10px" }}>
                              <h4 style={{ float: "left" }}>
                                {user.name}{" "}
                                <span style={{ fontSize: "15px" }}>
                                  {user.parentId == user.uid && "(Main)"}
                                </span>{" "}
                              </h4>
                              <p style={{ textAlign: "left" }}>{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <FaRegEdit
                            style={{ fontSize: "25px", cursor: "pointer" }}
                            onClick={() => editUser(user.uid)} // Pass user.uid to editUser
                          />
                          {user.parentId !== user.uid && (
                            <RiDeleteBin6Line
                              style={{ fontSize: "25px", cursor: "pointer" }}
                            />
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
