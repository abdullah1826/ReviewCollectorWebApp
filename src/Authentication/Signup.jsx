import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database"; // Import for Firebase database
import app from "../Firebase"; // Import Firebase configuration
import styles from "../Authentication/Signup.module.css";
import collector from "../assets/images/collector.png";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";


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

    const emailRegEx = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z]{2,8})?$/;
    if (!emailRegEx.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
  const signin = ()=>{
    navigate('/signin')
  }
  
  return (
    <div className="container-fluid">
      <div className={styles.body}>
        <div className={styles.signupcontainer}>
          <h1>
            <img src={collector} width="55px" height="55px" alt="Collector" />
            Review Collector
          </h1>
          <h2>Sign up</h2>
          <p style={{fontSize:"17px"}}>Create an Account to Continue</p>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  paddingRight: '40px', // Add space for the icon
                  padding: '10px',
                  fontSize: '16px',
                }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#00c849',
                }}
              >
                {showPassword ? <IoEyeOffSharp size={20} /> : <IoEyeSharp size={20} />}
              </span>
            </div>

            <button type="submit">Sign Up</button>
            <p style={{ textDecoration: "underline",paddingTop:'15px',fontSize:'15px' }}>Already have an account? <span onClick={signin} style={{cursor:'pointer',color:'#13cb56'}}>Sign In</span></p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
