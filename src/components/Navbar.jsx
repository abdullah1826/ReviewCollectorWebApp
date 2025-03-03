import { useRef, useEffect } from "react";
import styles from "../components/Navbar.module.css";
import collector from "../assets/images/reviewCollectorWhite.png";
import { IoPersonSharp } from "react-icons/io5";
import { IoAnalyticsSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiSurveyFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname; // Current URL path

  const navbarRef = useRef(null);

  const handleNavClick = (link) => {
    if (link === "profile") navigate("/profile");
    if (link === "survey") navigate("/survey");
    if (link === "dashboard") navigate("/dashboard");
    if (link === "setting") navigate("/setting");
  };

  // Close navbar toggle on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        const toggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");
        
        if (navbarCollapse.classList.contains("show")) {
          toggler.click(); // Simulate click to close toggle
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.navbar} ref={navbarRef}>
      <div className="container">
        <nav
          className={`navbar navbar-expand-lg navbar-light ${styles.navbarStyle}`}
        >
          <h1 className="navbar-brand">
            <span
              className={styles.brandText}
              onClick={() => handleNavClick("profile")}
              style={{ cursor: "pointer" }}
            >
              <img src={collector} width="200px" alt="Collector Logo" />
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
            style={{ outline: "none" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  onClick={() => handleNavClick("profile")}
                  style={{ color: "white" }}
                  className={`nav-link ${
                    pathname === "/profile" ? styles.activeLink : ""
                  }`}
                >
                  <span
                    className={styles.iconText}
                    style={{
                      color: pathname === "/profile" && "#11cb55",
                      fontWeight: pathname === "/profile" && "500",
                    }}
                  >
                    <IoPersonSharp /> Profile
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => handleNavClick("survey")}
                  style={{ color: "white" }}
                  className={`nav-link ${
                    pathname === "/survey" ? styles.activeLink : ""
                  }`}
                >
                  <span
                    className={styles.iconText}
                    style={{
                      color: pathname === "/survey" && "#11cb55",
                      fontWeight: pathname === "/survey" && "500",
                    }}
                  >
                    <RiSurveyFill /> Survey
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => handleNavClick("dashboard")}
                  style={{ color: "white" }}
                  className={`nav-link ${
                    pathname === "/dashboard" ? styles.activeLink : ""
                  }`}
                >
                  <span
                    className={styles.iconText}
                    style={{
                      color: pathname === "/dashboard" && "#11cb55",
                      fontWeight: pathname === "/dashboard" && "500",
                    }}
                  >
                    <IoAnalyticsSharp /> Insights
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => handleNavClick("setting")}
                  style={{ color: "white" }}
                  className={`nav-link ${
                    pathname === "/setting" ? styles.activeLink : ""
                  }`}
                >
                  <span
                    className={styles.iconText}
                    style={{
                      color: pathname === "/setting" && "#11cb55",
                      fontWeight: pathname === "/setting" && "500",
                    }}
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
