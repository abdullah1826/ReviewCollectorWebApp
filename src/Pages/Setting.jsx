import Navbar from "../components/Navbar";
import styles from "../Pages/Setting.module.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";

import { MdEdit } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";

import { AiOutlineLogout } from "react-icons/ai";
import passwordicon from "../assets/icons/password.png";


import profilepic from "../assets/images/profileP.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPrivacyTip } from "react-icons/md";


import {
  getAuth,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  remove,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { useEffect } from "react";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
const [showPassword, setShowPassword] = useState(false);


  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const about = () => {
    navigate("/aboutApp");
  };

  const handleResetPassword = () => {
    const user = auth.currentUser;

    if (user && user.email) {
      // SweetAlert confirmation dialog
      Swal.fire({
        title: `Reset Password for ${user.email}?`,
        text: "Are you sure you want to send a reset email?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, reset it!",
        cancelButtonText: "No, cancel",
        customClass: {
          confirmButton: styles.confirmButton,
          cancelButton: styles.cancelButton,
        },
      }).then((result) => {
        if (result.isConfirmed) {
          sendPasswordResetEmail(auth, user.email)
            .then(() => {
              // SweetAlert success message
              Swal.fire({
                title: "Success!",
                text: `Password reset email sent to ${user.email}. Please check your inbox.`,
                icon: "success",
                customClass: {
                  confirmButton: styles.confirmButton, // Green button for info dialog
                },
              });
            })
            .catch((error) => {
              // SweetAlert error message
              Swal.fire({
                title: "Error!",
                text: "Failed to send reset email. Please try again.",
                icon: "error",
                customClass: {
                  confirmButton: styles.confirmButton, // Green button for info dialog
                },
              });
              console.error("Error sending reset email:", error.message);
            });
        } else {
          // SweetAlert canceled message
          Swal.fire({
            title: "Canceled",
            text: "Password reset was not performed.",
            icon: "info",
            customClass: {
              confirmButton: styles.confirmButton, // Green button for info dialog
            },
          });
        }
      });
    } else {
      // SweetAlert for no user logged in
      Swal.fire({
        title: "No User Logged In",
        text: "Please log in to reset the password.",
        icon: "warning",
        customClass: {
          confirmButton: styles.confirmButton, // Green button for info dialog
        },
      });
    }
  };
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
  
    const user = auth.currentUser;
    const db = getDatabase();
  
    if (!user) {
      Swal.fire({
        title: "No User Logged In",
        text: "Please log in to delete your account.",
        icon: "warning",
        customClass: {
          confirmButton: styles.confirmButton,
        },
      });
      return;
    }
  
    if (!password) {
      Swal.fire({
        title: "Password Required",
        text: "Please enter your password to delete the account.",
        icon: "warning",
        customClass: {
          confirmButton: styles.confirmButton,
        },
      });
      return;
    }
  
    const credential = EmailAuthProvider.credential(user.email, password);
  
    try {
      // SweetAlert confirmation before deletion
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will delete your account and all associated data. You cannot undo this.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep my account",
        customClass: {
          confirmButton: styles.confirmButton,
        },
      });
  
      if (!result.isConfirmed) {
        Swal.fire({
          title: "Canceled",
          text: "Your account was not deleted.",
          icon: "info",
          customClass: {
            confirmButton: styles.confirmButton,
          },
        });
        return;
      }
  
      // Reauthenticate the user
      await reauthenticateWithCredential(user, credential);
  
      const userId = user.uid;
      const tables = ["Reviews", "Analytic"];
      let dbDeletionSuccess = false;
      let authDeletionSuccess = false;
  
      // Check if the user exists in the database
      const userRef = ref(db, `User/${userId}`);
      const userSnapshot = await get(userRef);
  
      if (userSnapshot.exists()) {
        // Delete data from other tables
        const deletePromises = tables.map((table) => {
          const tableRef = ref(db, table);
          const tableQuery = query(tableRef, orderByChild("userid"), equalTo(userId));
  
          return get(tableQuery).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const deleteUserDataPromises = Object.keys(data).map((key) =>
                remove(ref(db, `${table}/${key}`))
              );
              return Promise.all(deleteUserDataPromises);
            }
            return Promise.resolve();
          });
        });
  
        // Delete user data from the User table
        await Promise.all([...deletePromises, remove(userRef)]);
        dbDeletionSuccess = true;
      }
  
      // Try deleting the authentication account
      try {
        await deleteUser(user);
        authDeletionSuccess = true;
      } catch (authError) {
        if (authError.code === "auth/requires-recent-login") {
          Swal.fire({
            title: "Authentication Failed",
            text: "Your session has expired. Please log in again and try deleting your account.",
            icon: "error",
            customClass: {
              confirmButton: styles.confirmButton,
            },
          });
          return;
        }
      }
  
      // Show final success message based on what was deleted
      if (dbDeletionSuccess || authDeletionSuccess) {
        Swal.fire({
          title: "Account Deleted!",
          text: "Your account and data have been deleted successfully.",
          icon: "success",
          customClass: {
            confirmButton: styles.confirmButton,
          },
        });
  
        // Clear local storage and redirect
        localStorage.clear();
        closeModal();
        navigate("/signin");
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to delete the account. Please try again later.",
          icon: "error",
          customClass: {
            confirmButton: styles.confirmButton,
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete account. Incorrect password.",
        icon: "error",
        customClass: {
          confirmButton: styles.confirmButton,
        },
      });
    }
  };
  
  const handleProfileClick = () => {
    navigate("/manageProfile");
  };

  const logoutUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, stay logged in",
      customClass: {
        confirmButton: styles.confirmButton, // Green confirmation button
        cancelButton: styles.cancelButton, // Red cancel button
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logout logic
        localStorage.clear();
        navigate("/signin");
        console.log("User logged out");
      } else {
        console.log("Logout cancelled");
      }
    });
  };
  const privacyPolicy =()=>{
    navigate('/privacyPolicy');
  }
  useEffect(() => {
    const uid = localStorage.getItem("useruid");
    if (!uid) {
      console.error("No UID found in localStorage.");
      return;
    }

    const fetchUserData = async () => {
      const db = getDatabase();
      const userRef = ref(db, `User/${uid}`);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.error("No data available for this user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.containerFluid}>
      <Navbar />
      <div className="container">
        {isOpen && (
          <div className={styles.overlay}>
            <div className={styles.modal}>
              <h3 className={styles.modalTitle}>Delete Account</h3>
              <p className={styles.modalText}>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <form className={styles.form} onSubmit={handleDeleteAccount}>
                <div style={{ position: "relative", width: "100%" }}>
                                  <img
                                    src={passwordicon}
                                    alt="Email Icon"
                                    style={{
                                      position: "absolute",
                                      left: "10px",
                                      top: "40%",
                                      transform: "translateY(-50%)",
                                      width: "22px",
                                      height: "22px",
                                    }}
                                  />
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{
                                      paddingLeft: "40px", // Add space for the icon
                                    }}
                                    className="form-control mb-3"
                                  />
                                  <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                      position: "absolute",
                                      top: "44%",
                                      right: "15px",
                                      transform: "translateY(-50%)",
                                      cursor: "pointer",
                                      color: "#00c849",
                                    }}
                                  >
                                    {showPassword ? (
                                      <IoEyeOffSharp size={20} />
                                    ) : (
                                      <IoEyeSharp size={20} />
                                    )}
                                  </span>
                                </div>
                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.submitButton}>
                    Confirm Delete
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-12">
            <div className={styles.logout}>
              <div className={styles.profile}>
                <div style={{ position: "relative" }}>
                  <img
                    src={userData?.profileUrl || profilepic}
                    width="130px"
                    height="132px"
                    alt="Profile"
                  />
                  <MdEdit

                    className={styles.editIcon}
                    onClick={handleProfileClick}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className={styles.userDetails}>
                  <p className={styles.userName} style={{ margin: "0" }}>
                    {userData?.businessName || "Guest"}
                  </p>
                  <p className={styles.businessName}>
                    {userData?.email || "Email"}
                  </p>
                </div>
              </div>
              <div className={styles.profile}>
                <button onClick={logoutUser} className={styles.logoutButton}>
                  Logout <AiOutlineLogout />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.settingSection}>
        <div className="row g-3">
        <div className="col-md-6">
          <div
            className={`${styles.settings} ${styles.hoverEffect}`}
            onClick={about}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
              <BsFillInfoCircleFill className={styles.iconStyle}/>

                <p className={`${styles.title} ms-3 mb-0`}>About</p>
              </div>
              <span><IoIosArrowForward />
              </span>
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="col-md-6">
          <div className={`${styles.settings} ${styles.hoverEffect}`} onClick={privacyPolicy}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
              <MdPrivacyTip className={styles.iconStyle}/>
                <p className={`${styles.title} ms-3 mb-0`}>Privacy Policy</p>
              </div>
              <span><IoIosArrowForward />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row with One Column */}
      <div className={`row g-3  ${styles.second}`}>
      <div className="col-md-6">
      <div
        className={`${styles.settings}`}
        onClick={handleResetPassword}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <RiLockPasswordFill className={styles.iconStyle} />
            <p className={`${styles.title} ms-3 mb-0`}>Reset Password</p>
          </div>
          <span>
            <IoIosArrowForward />
          </span>
        </div>
      </div>
    </div>
      </div>
      <h3 className="text-center" onClick={openModal} style={{marginTop:"40px",fontWeight:"600",fontSize:"20px",color:"red",textDecoration:'underline',cursor:"pointer"}}>Delete Account</h3>
        </div>
    
      </div>
    </div>
  );
};

export default Profile;
