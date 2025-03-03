import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database"; // Import for Firebase database
import app from "../Firebase"; // Import Firebase configuration
import styles from "../Authentication/Signup.module.css";
import collector from "../assets/images/reviewCollectorWhite.png";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import signinImage from "../assets/images/signinImage.png";
import emailicon from "../assets/icons/email.png";
import passwordicon from "../assets/icons/password.png";
import profile from "../assets/icons/profile.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth(app);
  const db = getDatabase(app);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form submission reload

    if (!username) {
      setError("Please add a username");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const User = userCredential.user;

      localStorage.setItem("useruid", User.uid);
      localStorage.setItem("parentid", User.uid);
      await createProfile(User.uid);
      setSuccess("Account created successfully!");
      navigate("/profile");
      setError(""); // Clear any previous errors
    } catch (error) {
      const errorCode = error.code;
      setError(error.message);

      if (errorCode === "auth/invalid-email") {
        setError("Please enter a valid email");
      } else if (errorCode === "auth/email-already-in-use") {
        setError("Email already exists");
      } else if (errorCode === "auth/weak-password") {
        setError("Password must be at least 6 characters");
      }
    }
  };
  async function createProfile(uid) {
    try {
      await update(ref(db, `User/${uid}`), {
        name: username,
        uid: uid,
        parentId: uid,
        email: email,
        businessName: "",
        address: "",
        businessPageLink: "",
        city: "",
        coverUrl: "",
        deleted: false,
        phone: "",
        profileUrl: "",
        qrLinkType: "survey",
        reviewLink: "",
      });
      console.log("Profile created successfully!");
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  }
  const signin = () => {
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
                <h2 className="fw-bold mb-3">Sign up</h2>
                <p style={{ fontSize: "17px", marginBottom: "60px" }}>
                  Create an Account to Continue
                </p>
                {/* Display error or success message */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <form onSubmit={ (e) =>handleSignup(e) }>
                  <div style={{ position: "relative", width: "100%" }}>
                    <img
                      src={profile}
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
                      type="text"
                      placeholder="Name"
                      value={username}
                      className="form-control mb-3"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      style={{
                        paddingLeft: "40px", // Add space for the icon
                      }}
                    />
                  </div>
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
                  <button
                    type="submit"
                    className="btn w-100 text-white"
                    style={{ backgroundColor: "#1ACB5B" }}
                  >
                    Sign Up
                  </button>
                  <p
                    className="text-center mt-3"
                    style={{
                      textDecoration: "none",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Already have an account?{" "}
                    <span
                      onClick={signin}
                      style={{ cursor: "pointer", color: "#13cb56" }}
                    >
                      Log In
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

export default Signup;
