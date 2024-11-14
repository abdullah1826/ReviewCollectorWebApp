import styles from "../Authentication/Signin.module.css";
import rectangleLeft from "../assets/images/RectangleLeft.png";
import rectangleRight from "../assets/images/RectangleRight.png";
import collector from "../assets/images/collector.png";


const Signin = () => {
  return (
    <div className="container-fluid">
      <div className={styles.body}>
          <div className={styles.leftImage}>
          <img src={rectangleLeft} style={{width:'160px',height:"100vh"}}/>

          </div>
        <div className={styles.signupcontainer}>
          <h1><img src={collector} width="55px" height="55px"/>Review Collector</h1>
          <h2>Sign In</h2>
          <p>Login to your Account</p>

          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <p style={{float:'right',fontSize:"19px",fontWeight:'600'}}>Forgot Password?</p>

          <button type="submit">Sign In</button>
        </div>
        <div className={styles.rigthtImage}>
          <img src={rectangleRight} style={{width:'160px',height:"100vh"}}/>

          </div>
      </div>
    </div>

  );
};

export default Signin;
