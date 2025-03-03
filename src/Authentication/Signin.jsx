import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "../Authentication/Signin.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import collector from "../assets/images/reviewCollectorWhite.png";
import signinImage from "../assets/images/signinImage.png";
import emailicon from "../assets/icons/email.png";
import passwordicon from "../assets/icons/password.png";

import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const Signin = () => {
  const location = useLocation();
  const initialMessage = location.state?.message || null;
  const [message, setMessage] = useState(initialMessage);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    const auth = getAuth();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const User = userCredential.user;
      localStorage.setItem("useruid", User.uid);
      localStorage.setItem("parentid", User.uid);
      console.log("Signed in as:", User.email);
      setError(""); // Clear any previous errors
      navigate("/profile");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        setError("User not found. Please check your email.");
      } else if (errorCode === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (errorCode === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Invalid Credentials.");
      }
    }
  };

  const signup = () => {
    navigate("/signup");
  };
  const forgotPassword = () => {
    navigate("/forgotPassword"); // Navigate to ForgotPassword page
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000); // Clear the message after 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [message]);

  return (
    <div className="container-fluid vh-100">
      <div className={styles.body}>
        <div className={styles.signupcontainer}>
          <div className="row h-100">
            {/* Left Section: Login Form */}
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
              <div className={styles.form}>
                <h2 className="fw-bold mb-3">Log in</h2>
                <p style={{ fontSize: "17px", marginBottom: "60px" }}>
                  Login to your Account
                </p>
                {error && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {error}
                  </div>
                )}
                <form onSubmit={handleSignin}>
                  <div style={{ position: "relative", width: "100%" }}>
                    <img
                      src={emailicon}
                      alt="Email Icon"
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "22px",
                        height: "22px",
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      className="form-control mb-3"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        paddingLeft: "40px", // Add space for the icon
                      }}
                    />
                  </div>
                  <div style={{ position: "relative", width: "100%" }}>
                    <img
                      src={passwordicon}
                      alt="Email Icon"
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "22px",
                        height: "22px",
                      }}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        paddingLeft: "40px", // Add space for the icon
                      }}
                      className="form-control mb-3"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        top: "54%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#00c849",
                      }}
                    >
                      {showPassword ? (
                        <IoEyeOffSharp size={20} />
                      ) : (
                        <IoEyeSharp size={20} />
                      )}
                    </span>
                  </div>
                  <p className="text-end mb-3">
                    <a
                      onClick={forgotPassword}
                      style={{
                        float: "right",
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                      className="text-success text-decoration-none"
                    >
                      Forgot Password?
                    </a>
                  </p>
                  <button
                    type="submit"
                    className="btn w-100 text-white"
                    style={{ backgroundColor: "#1ACB5B" }}
                  >
                    Log In
                  </button>
                  <p
                    className="text-center mt-3"
                    style={{
                      textDecoration: "none",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Don,t have an account?{" "}
                    <span
                      onClick={signup}
                      style={{ cursor: "pointer", color: "#13cb56" }}
                    >
                      Sign Up
                    </span>
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

export default Signin;
