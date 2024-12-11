import { useState,useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "../Authentication/Signin.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import collector from "../assets/images/collector.png";
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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

  const signup = ()=>{
    navigate('/signup');
  }
  const forgotPassword = () => {
    navigate('/forgotPassword'); // Navigate to ForgotPassword page
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
    <div className="container-fluid">
      <div className={styles.body}>
        <div className={styles.signupcontainer}>
          <h1>
            <img src={collector} width="55px" height="55px" alt="Collector" />
            Review Collector
          </h1>
          <h2>Sign In</h2>
          <p style={{fontSize:"17px"}}>Login to your Account</p>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

          <form onSubmit={handleSignin}>
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
            <p style={{ float: "right", fontSize: "14px", fontWeight: "600",cursor:'pointer' }} onClick={forgotPassword}>
              Forgot Password?
            </p>
            <button type="submit">Sign In</button>
            <p style={{ textDecoration: "underline",paddingTop:'15px',fontSize:'15px' }}>Dont have an account? <span onClick={signup} style={{cursor:'pointer',color:'#13cb56'}}>Sign Up</span></p>
          </form>
                  
        </div>
      </div>
    </div>
  );
};

export default Signin;

