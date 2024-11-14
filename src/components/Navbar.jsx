import styles from "../components/Navbar.module.css";
import collector from "../assets/images/collector.png";
import { IoPersonSharp } from "react-icons/io5";
import { IoAnalyticsSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiSurveyFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => navigate('/profile');
  const handleSurveyClick = () => navigate('/survey');
  const handleClickDashboard = () => navigate('/dashboard');
  const setting = () => navigate('/setting');

  return (
    <div className="container">
      <div className={styles.navbar}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <h1 className="navbar-brand">
            <span className={styles.brandText}>
              <img src={collector} width="40px" height="50px" alt="Collector Logo" />
              Review Collector
            </span>
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a onClick={handleProfileClick} className="nav-link">
                  <span className={styles.iconText}><IoPersonSharp /> Profile</span>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={handleSurveyClick} className="nav-link">
                  <span className={styles.iconText}><RiSurveyFill /> Survey</span>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={handleClickDashboard} className="nav-link">
                  <span className={styles.iconText}><IoAnalyticsSharp /> Analytics</span>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={setting} className="nav-link">
                  <span className={styles.iconText}><IoIosSettings /> Setting</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
