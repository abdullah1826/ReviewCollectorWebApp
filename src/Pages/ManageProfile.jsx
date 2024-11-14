import Navbar from "../components/Navbar";
import styles from "../Pages/ManageProfile.module.css";
import { IoCopyOutline } from "react-icons/io5";
import  Rectangle from "../assets/images/Rectangle.png";
import { useNavigate } from "react-router-dom";

const ManageProfile = () => {
  const navigate = useNavigate();
  const handleBack = ()=>{
    navigate(-1);
  }
  return (
    <div className="container-fluid"> 
        <Navbar/>
        <div className="container">
      {/* Header Image */}
      <div className={styles.headerImage}>
        <button className={styles.backbtn} onClick={handleBack}>Back</button>
        <img src={Rectangle} alt="Header" height="200px" style={{height:'240px'}}/>
      </div>

      {/* Profile and Search Section */}
      <div className={styles.profileSection}>
        <img src="https://via.placeholder.com/50" className={styles.profileImage} alt="User" />
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>
      </div>

      {/* Input Form */}
      <div className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <input type="text" placeholder="Business Name" className={styles.inputField} />
          <input type="text" placeholder="Phone Number" className={styles.inputField} />
        </div>
        <div className={styles.inputGroup}>
          <div style={{width:'100%',position:"relative"}}>  
          <input type="text" placeholder="Review Link" className={styles.inputField} />
          <button className={styles.iconButton}>
            <IoCopyOutline/>
          </button>
          </div>
          <div style={{width:'100%',position:"relative"}}>  
          <input type="text" placeholder="Google Business Page Link" className={styles.inputField} />
          <button className={styles.iconButton}>
          <IoCopyOutline/>
          </button>
          </div>

        </div>
        <div className={styles.inputFullWidth}>
          <input type="text" placeholder="Email Address" className={styles.inputField} />
        </div>
      </div>

      {/* Mode Selector */}
      <div className={styles.modeSelector}>
        <span style={{fontSize:"19px"}}>Select Colors</span>
        <div>
          <label>
              Light Mode
            <input
               type="radio"
               className={styles.colorInput}
            />
          </label>

          <label>
               Dark Mode
            <input
                type="radio"
                 className={styles.colorInput}
            />
          </label>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ManageProfile
