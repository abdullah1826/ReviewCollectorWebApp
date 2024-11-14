import styles from "../Authentication/Signup.module.css";
import rectangleLeft from "../assets/images/RectangleLeft.png";
import rectangleRight from "../assets/images/RectangleRight.png";
import collector from "../assets/images/collector.png";


const Signup = () => {
  return (
 <div className="container-fluid">
    <div className={styles.body}>
        <div className={styles.leftImage}>
         <img src={rectangleLeft} style={{width:'160px',height:"100vh"}}/>

        </div>
      <div className={styles.signupcontainer}>
        <h1><img src={collector} width="55px" height="55px"/>Review Collector</h1>
        <h2>Sign up</h2>
        <p>Create an Account to Continue</p>

        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button type="submit">Sign Up</button>
      </div>
      <div className={styles.rigthtImage}>
         <img src={rectangleRight} style={{width:'160px',height:"100vh"}}/>

        </div>
    </div>
 
    </div>
    );
};

export default Signup;


