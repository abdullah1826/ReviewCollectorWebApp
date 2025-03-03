import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styles from "../Authentication/ForgotPassword.module.css";
import collector from "../assets/images/reviewCollectorWhite.png";
import { useNavigate } from "react-router-dom";
import signinImage from "../assets/images/signinImage.png";
import { IoArrowBack } from "react-icons/io5";
import emailicon from "../assets/icons/email.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State to store the email
  const [error, setError] = useState(""); // State for errors
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setError("");
      setSuccessMessage("Password reset email sent! Check your inbox.");

      // Disable the button and start the countdown
      setIsDisabled(true);
      setTimer(30);

      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setIsDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        setError("No user found with this email.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setSuccessMessage("");
    }
  };
  const Signin = () => {
    navigate("/signin");
  };

  return (
    <div className="container-fluid vh-100">
      <div className={styles.body}>
        <div className={styles.signupcontainer}>
          <div className="row h-100">
            {/* Left Section: Login Form */}
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
              <div className={styles.form}>
                <h2 className="fw-bold mb-3">Forgot Password?</h2>
                <p style={{ fontSize: "17px", marginBottom: "60px" }}>
                  No worries, we'll send you reset instructions
                </p>

                {/* Display error or success message */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {successMessage && (
                  <p style={{ color: "green" }}>{successMessage}</p>
                )}
                <form onSubmit={handleResetPassword}>
                  <div style={{ position: "relative", width: "100%" }}>
                    <img
                      src={emailicon}
                      alt="Email Icon"
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "40%",
                        transform: "translateY(-50%)",
                        width: "22px",
                        height: "22px",
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        paddingLeft: "40px", // Add space for the icon
                      }}
                    />
                  </div>


                  <button className="btn w-100 text-white"
                  style={{ backgroundColor: "#1ACB5B" }} type="submit" disabled={isDisabled}>
          {isDisabled ? `Try again in ${timer} sec` : "Reset Password"}
        </button>
                  <p
                    className="mt-5"
                    style={{
                      backgroundColor: "white",
                      color: "rgb(0 0 0 / 54%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: "500",
                      cursor: "pointer",
                      gap: "8px",
                      marginTop: "10px",
                    }}
                    onClick={Signin}
                  >
                    <IoArrowBack size={18} />
                    Back To Log In
                  </p>
                </form>
              </div>
            </div>

            {/* Right Section: Banner */}
            <div
              className={`col-md-6 ${styles.banner}`}
              style={{
                background: "linear-gradient(180deg, #1ACB5B 0%, #0D622C 100%)",
                margin: 0,
                padding: 0,
              }}
            >
              <div className={styles.textinfo}>
                <h1>Welcome to</h1>
                <img src={collector} width="350px" alt="Collector" />
              </div>
              <div className={styles.imageinfo}>
                <img src={signinImage} width="100%" alt="Collector" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
