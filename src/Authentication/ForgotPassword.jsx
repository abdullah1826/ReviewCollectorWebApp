import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styles from "../Authentication/ForgotPassword.module.css";
// import rectangleLeft from "../assets/images/RectangleLeft.png";
// import rectangleRight from "../assets/images/RectangleRight.png";
import collector from "../assets/images/collector.png";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State to store the email
  const [error, setError] = useState(""); // State for errors
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent form submission reload

    const auth = getAuth();
    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError(""); // Clear any previous errors
      setSuccessMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        setError("No user found with this email.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setSuccessMessage(""); // Clear success message if an error occurs
    }
  };
  const Signin = ()=>{
    navigate('/signin');
  }

  return (
    <div className="container-fluid">
      <div className={styles.body}>
        {/* <div className={styles.leftImage}>
          <img src={rectangleLeft} style={{ width: '160px', height: "100vh" }} />
        </div> */}
        <div className={styles.signupcontainer}>
          <h1><img src={collector} width="55px" height="55px" />Review Collector</h1>
          <h2>Forgot Password</h2>
          <p>Enter your email to reset your password.</p>

          {/* Display error or success message */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
        <button style={{backgroundColor:'white',color:"#00c849"}} onClick={Signin}>Cancel</button>

          </form>
        </div>

        {/* <div className={styles.rigthtImage}>
          <img src={rectangleRight} style={{ width: '160px', height: "100vh" }} />
        </div> */}
      </div>
    </div>
  );
};

export default ForgotPassword;

