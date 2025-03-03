import Navbar from "../components/Navbar";
import styles from "../Pages/Dashboard.module.css";
import pops from "../assets/icons/ic-Simple3.png";
import links from "../assets/icons/ic-Simple4.png";
import excellent from "../assets/icons/excellenticon.png";
import fair from "../assets/icons/fair2.png";
import like from "../assets/icons/like.png";
import bad from "../assets/icons/bad.png";


import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { query, orderByChild, equalTo } from "firebase/database";
import desc from "../assets/icons/desc.png";

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
      <div className="container">
        <div className="row">
          <div className="col-md-6 my-2">
            <div
              className={styles.fanalytics}
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection:'column',
                backgroundColor: "#2BCE67",
              }}
            >
              <div style={{ display: "flex",alignItems:"center" }}>
              <img src={links} width="65px" height="69px" />

                <p
                  style={{
                    fontSize: "20px",
                    fontFamily: "Poppins",
                    paddingTop: "20px",
                    paddingLeft: "10px",
                    paddingRight:'3px',
                    color:'white'
                  }}
                >
                  Pops
                </p>
                <span >
                  <img src={desc} width="20px"/>
                </span>
              </div>
              <h1 style={{color:'white'}}>{allReview?.tViewsCrntWk || 0}</h1>
            </div>
          </div>

          <div className="col-md-6 my-2">
            <div
              className={styles.fanalytics}
              style={{
                display: "flex",
                flexDirection:'column',
                justifyContent: "space-around",
                backgroundColor: "#2BCE67",

              }}
            >
              <div style={{ display: "flex",alignItems:'center' }}>
              <img src={pops} width="65px" height="69px" />
                <p
                  style={{
                    fontSize: "20px",
                    fontFamily: "Poppins",
                    paddingTop: "20px",
                    paddingLeft: "10px",
                    paddingRight:'3px',
                    color:"white"
                  }}
                >
                  Link Taps
                </p>
                <span>
                  <img src={desc} width="20px"/>
                </span>
              </div>
              <h1 style={{color:'white'}}>{allReview?.tReviewsCrntWk || 0}</h1>
            </div>
          </div>

          <div className="col-md-6 mt-4">
  <div
    className={styles.analytics}
  >
    {/* Icon Section */}
    <div
      style={{
        backgroundColor: "#E8E500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        minWidth: "80px",
      }}
    >
      <img
        src={excellent}
        style={{ width: "40px", height: "40px" }}
      />
    </div>

    {/* Text Section */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1,
        backgroundColor: "#FFF",
        padding: "10px 20px",
      }}
    >
      <p style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>
        Excellent
      </p>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
        {allReview?.counts?.excellent || 0}
      </h1>
    </div>
  </div>
</div>

<div className="col-md-6 mt-4">
  <div
    className={styles.analytics}
  >
    {/* Icon Section */}
    <div
      style={{
        backgroundColor: "#00D8E0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        minWidth: "80px",
      }}
    >
      <img
        src={like}
        style={{ width: "40px", height: "40px" }}
      />
    </div>

    {/* Text Section */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1,
        backgroundColor: "#FFF",
        padding: "10px 20px",
      }}
    >
      <p style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>
      Good
      </p>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
        {allReview?.counts?.good || 0}
      </h1>
    </div>
  </div>
</div>
<div className="col-md-6 mt-4">
  <div
    className={styles.analytics}
  >
    {/* Icon Section */}
    <div
      style={{
        backgroundColor: "#0070E0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        minWidth: "80px",
      }}
    >
      <img
        src={fair}
        style={{ width: "40px", height: "40px" }}
      />
    </div>

    {/* Text Section */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1,
        backgroundColor: "#FFF",
        padding: "10px 20px",
      }}
    >
      <p style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>
        Fair
      </p>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
        {allReview?.counts?.fair || 0}
      </h1>
    </div>
  </div>
</div>
<div className="col-md-6 mt-4">
  <div
    className={styles.analytics}
  >
    {/* Icon Section */}
    <div
      style={{
        backgroundColor: "#E03000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        minWidth: "80px",
      }}
    >
      <img
        src={bad}
        alt="Excellent Icon"
        style={{ width: "40px", height: "40px" }}
      />
    </div>

    {/* Text Section */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1,
        backgroundColor: "#FFF",
        padding: "10px 20px",
      }}
    >
      <p style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>
        Bad
      </p>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
        {allReview?.counts?.unsatisfactory || 0}
      </h1>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
