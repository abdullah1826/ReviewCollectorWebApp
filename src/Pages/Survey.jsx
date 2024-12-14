import Navbar from "../components/Navbar";
import styles from "../Pages/Survey.module.css";
import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { query, orderByChild, equalTo } from "firebase/database";
import google from "../assets/images/Google.jpg";
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
      const filtered = userRecords.filter((review) => review.option === option);
      setFilteredRecords(filtered);
    }
  };
  function truncateWithEllipsis(str, maxLength) {
    if (str.length <= maxLength) return str; // No truncation needed
    return str.slice(0, maxLength - 3) + "..."; // Add ellipsis
  }

  return (
    <div className={styles.containerFluid}>
      <Navbar />
      <hr />
      <div className="container">
        {/* Search and Filter Section */}
        <div
          className={`row mb-4 ${styles.search}`}
          style={{ position: "relative" }}
        >
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div
            className="col-md-2"
            style={{
              width: "85px",
              position: "absolute",
              top: "0",
              right: "5px",
            }}
          >
            <div className="dropdown">
              <MdTune
                className={`btn btn-block dropdown-toggle ${styles.btn}`}
                type="button"
                style={{ border: "none" }}
                id="filterDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                {["All", "excellent", "good", "fair", "unsatisfactory"].map(
                  (option) => (
                    <li key={option}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleFilter(option)}
                      >
                        {option}
                      </button>
                    </li>
                  )
                )}
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
              <div className="col-12 col-sm-6 col-md-6 mb-4" key={reviews.uid}>
                <div
                  className={`card-body ${styles.cardbody} ${styles.hoverEffect}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => openModal(reviews)}
                >
                  <div className="flex-grow-1 d-flex">
                    <img
                      src={google}
                      className="rounded-circle mr-3"
                      alt="User"
                      width="60px"
                      height="60px"
                    />
                    <div
                      style={{
                        overflow: "hidden",
                        height: "62px",
                        paddingRight: "4px",
                      }}
                    >
                      <h5 className={styles.heading}>{reviews.name}</h5>
                      <p
                        className={`card-text small text-muted ${styles.feedback}`}
                      >
                        {truncateWithEllipsis(reviews.feedback, 70)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="small text-muted">
                      {new Date(reviews.timestamp).toLocaleDateString()}
                    </div>
                    <div className={`${styles.statusUnsatisfactory} p-2 mb-1`}>
                      {reviews.option}
                    </div>
                    <div
                      className={styles.starRating}
                      style={{ width: "100px" }}
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <img
                          key={index}
                          width="20"
                          height="20"
                          src={
                            index < reviews.stars
                              ? "https://img.icons8.com/ios-glyphs/50/eab45e/star--v1.png"
                              : "https://img.icons8.com/ios-glyphs/50/cccccc/star--v1.png"
                          }
                          alt="star--v1"
                        />
                      ))}
                    </div>
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
              <button className={styles.closeButton} onClick={closeModal}>
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
              <h5
                style={{
                  fontSize: "17px",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  color: "#8D8D8D",
                }}
              >
                Full Name
              </h5>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>
                {selectReview.name}
              </p>
              <h5
                style={{
                  fontSize: "17px",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  color: "#8D8D8D",
                }}
              >
                Email
              </h5>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>
                {selectReview.email}
              </p>
              <h5
                style={{
                  fontSize: "17px",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  color: "#8D8D8D",
                }}
              >
                Feedback
              </h5>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  wordBreak: "break-all",
                }}
              >
                {selectReview.feedback}
              </p>
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
                <button
                  style={{
                    width: "115px",
                    outline: "none",
                    backgroundColor: "#FF9E9E",
                    borderRadius: "17px",
                    padding: "10px",
                    border: "none",
                  }}
                >
                  {selectReview.option}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Survey;
