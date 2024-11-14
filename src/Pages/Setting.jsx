import Navbar from "../components/Navbar";
import styles from "../Pages/Setting.module.css";
import profile from "../assets/images/image.jpg";
import information from "../assets/images/Information.png";
// import delete from "../assets/images/Delete.png";
import folder from "../assets/images/Folder.png";
import del from "../assets/images/Delete.png";
import resetPassword from "../assets/images/ResetPassword.png";
import { AiOutlineLogout } from "react-icons/ai";

const Profile = () => {
  return (
    <div className={styles.containerFluid}>
      <Navbar />
      <hr />
      <div className="container">
        <div className="row">
            <div className={styles.logout}>
                <div className={styles.profile}>
                    <img src={profile}  width="123px" height="124px"/>
                     <p>Avicenna Enterprise Solutions</p>
                </div>
                <div className={styles.profile}>
                   <button>Logout <AiOutlineLogout />
                   </button>
                </div>
            </div>
      
          </div>
          <div className="row">
                <div className="col-md-4">
                    <div className={styles.settings}>
                      <div>
                      <img src={information} width="70"/>
                      <p>About App</p>
                      </div>

                    </div>
                </div>
                <div className="col-md-4">
                <div className={styles.settings}>
                    <div>
                    <img src={folder} width="70"/>
                    <p>Privacy Policy</p>
                  </div>
                
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={styles.settings}>
                      <div>
                        <img src={resetPassword} width="70"/>
                        <p>Reset Password</p>
                      </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={styles.settings}>
                      <div>
                        <img src={del} width="70"/>
                        <p>Delete Account </p>
                      </div>      

                    </div>
                </div>
            </div>
        </div>
      </div>
  );
};

export default Profile;