import Navbar from "../components/Navbar";
import styles from "../Pages/Survey.module.css";
import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { query, orderByChild, equalTo } from "firebase/database";
import surveyProfile from "../assets/images/surveyProfile.png";
import { MdSearch } from "react-icons/md";

import badSurvey from "../assets/icons/badSurvey.png";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileCsv } from "react-icons/fa";


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

import fair from "../assets/icons/fair.png";
import excellent from "../assets/icons/excellent.png";
import good from "../assets/icons/good.png";

import { MdTune } from "react-icons/md";

const Survey = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRecords, setUserRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]); // For displaying filtered data
  const [selectReview, setSelectedReview] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // For the search functionality
  // const [selectedOption, setSelectedOption] = useState('All'); // For the filter functionality

  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userid = localStorage.getItem("useruid");
    if (!userid) {
      console.error("No userid found in localStorage");
      return;
    }

    const db = getDatabase();
    const userRef = ref(db, "Reviews");
    const userQuery = query(userRef, orderByChild("userid"), equalTo(userid));

    get(userQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const records = Object.keys(data).map((key) => ({
            ...data[key],
            uid: key,
          }));
          setUserRecords(records);
          setFilteredRecords(records); // Initially show all records
        } else {
          console.log("No matching records found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Handle Search Input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = userRecords.filter((review) =>
      review.name.toLowerCase().includes(value)
    );
    setFilteredRecords(filtered);
  };

  // Handle Filter Selection
  const handleFilter = (option) => {
    // setSelectedOption(option);
    if (option === "All") {
      setFilteredRecords(userRecords); // Show all records
    } else {
      if (option == "Bad") {
        option = "unsatisfactory";
      }
      const filtered = userRecords.filter(
        (review) => review.option.toLowerCase() === option.toLowerCase()
      );
      setFilteredRecords(filtered);
    }
  };
  function truncateWithEllipsis(str, maxLength) {
    if (str.length <= maxLength) return str; // No truncation needed
    return str.slice(0, maxLength - 3) + "..."; // Add ellipsis
  }
  const handleExportCSV = () => {
    // Prepare CSV data with headers
    const headers = ["Name", "Rating", "Feedback", "Date"]; // Example headers, adjust as needed
    
    // Map filteredRecords to CSV rows
    const data = filteredRecords.map((reviews) => [
      reviews.name, // Assuming reviews object has a 'name' field
      reviews.stars, // Assuming reviews object has a 'stars' field
     `"${reviews.feedback.replace(/"/g, '""')}"`,// Assuming reviews object has a 'feedback' field
      new Date(reviews.timestamp * 1000).toLocaleDateString() // Assuming 'timestamp' is in Unix format
    ]);
  
    // Combine headers and data into one array
    const csvData = [headers, ...data];
  
    // Convert array of arrays into CSV string
    const csvContent = csvData.map((row) => row.join(",")).join("\n");
  
    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
    // Create a link to trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "export.csv"; // Name of the downloaded file
    link.click();
  };
  const handleExportPDF = () => {
    const doc = new jsPDF();
  
    doc.text("Review Data", 14, 10);
  
    const headers = [["Name", "Rating", "Feedback", "Date"]];
    const data = filteredRecords.map((reviews) => [
      reviews.name,
      reviews.stars,
      reviews.feedback,
      new Date(reviews.timestamp * 1000).toLocaleDateString(),
    ]);
  
    // Use autoTable
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
    });
  
    doc.save("reviews.pdf");
  };
  return (
    <div className={styles.containerFluid}>
      <Navbar />
      <div className="container">
        <div
          className={`d-flex align-items-center ${styles.searchBar}`}
          style={{ gap: "10px", marginBottom: "60px" }}
        >
          <div
            style={{
              display: "flex",
              flex: "1",
              border: "1px solid rgb(26 203 91)",
              borderRadius: "8px",
              overflow: "hidden",
              height: "50px",
            }}
          >
            <div className={styles.searchIcon}>
              <MdSearch style={{ color: "#fff", fontSize: "20px" }} />
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              style={{ border: "none" }}
            />
          </div>

          {/* Export Buttons */}
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <button
    className={`btn btn-outline-success ${styles.searchBtns}`}
    style={{ height: "50px" }}
    onClick={handleExportCSV}  // Attach the export function to the button
  >
    <FaFileCsv />
  </button>
  <button
    className={`btn btn-outline-success ${styles.searchBtns}`}
    style={{ height: "50px" }}
    onClick={handleExportPDF}  // Attach the export function to the button
  >
    <FaFilePdf />
  </button>
            <div className="dropdown">
              <button
                className={`btn btn-outline-success ${styles.searchBtns}`}
                type="button"
                id="filterDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ height: "50px" }}
              >
                <MdTune />
              </button>
              <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                {["All", "Excellent", "Good", "Fair", "Bad"].map((option) => (
                  <li key={option}>
                   <button
                   style={{background:"white", color:"black", outline:"none", cursor:"pointer"}}
  className="dropdown-item custom-button"
  onClick={() => handleFilter(option)}
>
  {option}
</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          {filteredRecords.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info" role="alert">
                No records found.
              </div>
            </div>
          ) : (
            filteredRecords.map((reviews) => (
              <div className="col-12 col-sm-6 col-md-3 mb-4" key={reviews.uid}>
                <div
                  className={`card ${styles.cardbody} ${styles.hoverEffect}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => openModal(reviews)}
                >
                  <div className="card-body">
                    {/* User Avatar */}
                    <div className=" mb-3">
                      <img
                        src={surveyProfile}
                        className="rounded-circle"
                        alt="User"
                        width="80px"
                        height="80px"
                      />
                    </div>

                    {/* User Name and Rating */}
                    <h5 className={`${styles.heading} mb-1`}>
                      {reviews.option?.toLowerCase() === "excellent"
                        ? "(Google review)"
                        : reviews.name}
                    </h5>
                    <div className="d-flex align-items-center mb-2">
                      <div className={styles.starRating}>
                        {Array.from({ length: 5 }, (_, index) => (
                          <img
                            key={index}
                            width="18"
                            height="18"
                            src={
                              index < reviews.stars
                                ? "https://img.icons8.com/ios-glyphs/50/eab45e/star--v1.png"
                                : "https://img.icons8.com/ios-glyphs/50/cccccc/star--v1.png"
                            }
                            alt="star--v1"
                          />
                        ))}
                      </div>
                      <span
                        className="small text-muted ms-2"
                        style={{ paddingTop: "5px", paddingLeft: "5px" }}
                      >
                        {new Date(
                          reviews.timestamp * 1000
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Feedback Text */}
                    <p
                      className={`card-text large text-muted ${styles.feedback}`}
                      style={{
                        height: "70px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {reviews.option?.toLowerCase() === "excellent"
                        ? truncateWithEllipsis(
                            "This review was initiated on our Google Reviews page. Submission status may vary.",
                            90
                          )
                        : truncateWithEllipsis(reviews.feedback, 90)}
                    </p>

                    {/* Status Badge */}

                    {reviews.option?.toLowerCase() === "unsatisfactory" ? (
                      <img
                        src={badSurvey}
                        width="84px"
                        height="37px"
                        className="mt-4"
                      />
                    ) : reviews.option?.toLowerCase() === "fair" ? (
                      <img
                        src={fair}
                        width="83px"
                        height="37px"
                        className="mt-4"
                      />
                    ) : reviews.option?.toLowerCase() === "excellent" ? (
                      <img
                        src={excellent}
                        width="113px"
                        height="37px"
                        className="mt-4"
                      />
                    ) : reviews.option?.toLowerCase() === "good" ? (
                      <img
                        src={good}
                        width="92px"
                        height="37px"
                        className="mt-4"
                      />
                    ) : (
                      <div
                        className={`badge p-2`}
                        style={{ fontSize: "14px", marginTop: "10px" }}
                      >
                        {reviews.option
                          ? reviews.option.charAt(0).toUpperCase() +
                            reviews.option.slice(1).toLowerCase()
                          : ""}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={closeModal}
                style={{ outline: "none" }}
              >
                &times;
              </button>
              <h4
                style={{
                  fontSize: "22px",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  marginBottom: "30px",
                }}
              >
                Feedback Details
              </h4>

              <p
                className={`card-text large text-muted ${styles.feedback}`}
                style={{
                  height: "auto", // Adjust the height to allow full text display
                  overflow: "visible", // Ensure the text isn't cut off
                  textOverflow: "clip", // Disable the ellipsis
                }}
              >
                {selectReview.option?.toLowerCase() === "excellent"
                  ? "This review was initiated on our Google Reviews page. Submission status may vary."
                  : selectReview.feedback}
              </p>

              {/* <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  wordBreak: "break-all",
                }}
              >
                {selectReview.feedback}
              </p> */}
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className={styles.starRating}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <img
                      key={index}
                      width="20"
                      height="20"
                      src={
                        index < selectReview.stars
                          ? "https://img.icons8.com/ios-glyphs/50/eab45e/star--v1.png"
                          : "https://img.icons8.com/ios-glyphs/50/cccccc/star--v1.png"
                      }
                      alt="star--v1"
                    />
                  ))}
                </div>
                {selectReview.option?.toLowerCase() === "unsatisfactory" ? (
                  <img src={badSurvey} width="84px" height="37px" />
                ) : selectReview.option?.toLowerCase() === "fair" ? (
                  <img src={fair} width="83px" height="37px" />
                ) : selectReview.option?.toLowerCase() === "excellent" ? (
                  <img src={excellent} width="113px" height="37px" />
                ) : selectReview.option?.toLowerCase() === "good" ? (
                  <img src={good} width="92px" height="37px" />
                ) : (
                  <div
                    className={`badge p-2`}
                    style={{ fontSize: "14px", marginTop: "10px" }}
                  >
                    {selectReview.option
                      ? selectReview.option.charAt(0).toUpperCase() +
                        selectReview.option.slice(1).toLowerCase()
                      : ""}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Survey;
