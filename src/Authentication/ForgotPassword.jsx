import styles from "../Authentication/ForgotPassword.module.css";
import rectangleLeft from "../assets/images/RectangleLeft.png";
import rectangleRight from "../assets/images/RectangleRight.png";
import collector from "../assets/images/collector.png";


const ForgotPassword = () => {
  return (
    <div className="container-fluid">
    <div className={styles.body}>
        <div className={styles.leftImage}>
         <img src={rectangleLeft} style={{width:'160px',height:"100vh"}}/>

        </div>
      <div className={styles.signupcontainer}>
        <h1><img src={collector} width="55px" height="55px"/>Review Collector</h1>
        <h2>Forgot Password</h2>
        <p>Enter your email to login to your account?</p>
        <input type="email" placeholder="Email" required />

        <button type="submit">Submit</button>
      </div>
      <div className={styles.rigthtImage}>
         <img src={rectangleRight} style={{width:'160px',height:"100vh"}}/>

        </div>
    </div>
    </div>

  );
};

export default ForgotPassword;
