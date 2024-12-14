import Navbar from "../components/Navbar";
import styles from "../Pages/Dashboard.module.css";
import pops from "../assets/images/Group1.png";
import links from "../assets/images/Group2.png";
import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { query, orderByChild, equalTo } from "firebase/database";

const Dashboard = () => {
  const [allReview, setAlledReview] = useState([]);

  const fetchUserData = async () => {
    // Retrieve the user ID from localStorage
    const userid = localStorage.getItem("useruid");

    // Check if the user ID exists in localStorage
    if (!userid) {
      console.error("No useruid found in localStorage");
      return;
    }

    try {
      // Initialize Firebase Realtime Database
      const db = getDatabase();

      // Reference to the 'Reviews' node in the database
      const userRef = ref(db, "Analytic");
      console.log(userid);
      // Query the 'Reviews' node to find records with matching 'userid'
      const userQuery = query(userRef, orderByChild("userid"), equalTo(userid));

      // Fetch data using the query
      const snapshot = await get(userQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Fetched Data:", Object.values(data)[0]);
        setAlledReview(Object.values(data)[0]); // Store the fetched data in the state
      } else {
        console.log("No matching records found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className={styles.containerFluid}>
      <Navbar />
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-6 my-2">
            <div
              className={styles.analytics}
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "rgb(246, 243, 243",
              }}
            >
              <div style={{ display: "flex" }}>
                <img src={pops} width="65px" height="69px" />
                <p
                  style={{
                    fontSize: "20px",
                    fontFamily: "Poppins",
                    paddingTop: "20px",
                    paddingLeft: "10px",
                  }}
                >
                  Pops
                </p>
              </div>
              <h1>{allReview?.tViewsCrntWk || 0}</h1>
            </div>
          </div>

          <div className="col-md-6 my-2">
            <div
              className={styles.analytics}
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "rgb(246, 243, 243",
              }}
            >
              <div style={{ display: "flex" }}>
                <img src={links} width="65px" height="69px" />
                <p
                  style={{
                    fontSize: "20px",
                    fontFamily: "Poppins",
                    paddingTop: "20px",
                    paddingLeft: "10px",
                  }}
                >
                  Total Reviews
                </p>
              </div>
              <h1>{allReview?.tReviewsCrntWk || 0}</h1>
            </div>
          </div>

          <div className="col-md-6 my-2">
            <div
              className={styles.analytics}
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#A5FFC6",
              }}
            >
              <p style={{ fontSize: "29px" }}>Excellent</p>
              <h1>{allReview?.counts?.excellent || 0}</h1>
            </div>
          </div>
          <div className="col-md-6 my-2">
            <div
              className={styles.analytics}
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#B4FFB2",
              }}
            >
              <p style={{ fontSize: "29px" }}>Good</p>
              <h1>{allReview?.counts?.good || 0}</h1>
            </div>
          </div>
          <div className="col-md-6 my-2">
            <div
              className={styles.analytics}
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#FEFFC0",
              }}
            >
              <p style={{ fontSize: "29px" }}>Fair</p>
              <h1>{allReview?.counts?.fair || 0}</h1>
            </div>
          </div>
          <div className="col-md-6 my-2">
            <div
              className={styles.analytics}
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#FFCCC0",
              }}
            >
              <p style={{ fontSize: "29px" }}>Unsatisfactory</p>
              <h1>{allReview?.counts?.unsatisfactory || 0}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
