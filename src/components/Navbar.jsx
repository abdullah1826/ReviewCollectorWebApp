import styles from "../components/Navbar.module.css";
import collector from "../assets/images/collector.png";
import { IoPersonSharp } from "react-icons/io5";
import { IoAnalyticsSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiSurveyFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname; // Current URL path

  const handleNavClick = (link) => {
    // Navigate to the corresponding route
    if (link === "profile") navigate("/profile");
    if (link === "survey") navigate("/survey");
    if (link === "dashboard") navigate("/dashboard");
    if (link === "setting") navigate("/setting");
  };

  return (
    <div className="container">
      <div className={styles.navbar}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <h1 className="navbar-brand">
            <span
              className={styles.brandText}
              onClick={() => handleNavClick("profile")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={collector}
                width="40px"
                height="50px"
                alt="Collector Logo"
              />
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
                <a
                  onClick={() => handleNavClick("profile")}
                  className={`nav-link ${
                    pathname === "/profile" ? styles.activeLink : ""
                  }`}
                >
                  <span
                    className={styles.iconText}
                    style={{ color: pathname === "/profile" && "#11cb55" }}
                  >
                    <IoPersonSharp /> Profile
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => handleNavClick("survey")}
                  className={`nav-link ${
                    pathname === "/survey" ? styles.activeLink : ""
                  }`}
                >
                  <span
                    className={styles.iconText}
                    style={{ color: pathname === "/survey" && "#11cb55" }}
                  >
                    <RiSurveyFill /> Survey
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => handleNavClick("dashboard")}
                  className={`nav-link ${
                    pathname === "/dashboard" ? styles.activeLink : ""
                  }`}
                >
                  <span
                    className={styles.iconText}
                    style={{ color: pathname === "/dashboard" && "#11cb55" }}
                  >
                    <IoAnalyticsSharp /> Analytics
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => handleNavClick("setting")}
                  className={`nav-link ${
                    pathname === "/setting" ? styles.activeLink : ""
                  }`}
                >
                  <span
                    className={styles.iconText}
                    style={{ color: pathname === "/setting" && "#11cb55" }}
                  >
                    <IoIosSettings /> Setting
                  </span>
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
