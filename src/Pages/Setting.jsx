import Navbar from "../components/Navbar";
import styles from "../Pages/Setting.module.css";
import information from "../assets/images/Information.png";
import folder from "../assets/images/Folder.png";
import del from "../assets/images/Delete.png";
import resetPassword from "../assets/images/ResetPassword.png";
import { AiOutlineLogout } from "react-icons/ai";
import profilepic from "../assets/images/profileP.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";

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
import { useState, useEffect } from "react";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const auth = getAuth();

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
          confirmButton: styles.confirmButton, // Green button for info dialog
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
          confirmButton: styles.confirmButton, // Green button for info dialog
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
          confirmButton: styles.confirmButton, // Green button for info dialog
        },
      });

      if (!result.isConfirmed) {
        Swal.fire({
          title: "Canceled",
          text: "Your account was not deleted.",
          icon: "info",
          customClass: {
            confirmButton: styles.confirmButton, // Green button for info dialog
          },
        });
        return; // Exit if canceled
      }

      // Reauthenticate the user with the entered password
      await reauthenticateWithCredential(user, credential);

      const userId = user.uid;
      const tables = ["Reviews", "Analytic"];

      // Delete data from tables
      const deletePromises = tables.map((table) => {
        const tableRef = ref(db, table);
        const tableQuery = query(
          tableRef,
          orderByChild("userid"),
          equalTo(userId)
        );

        return get(tableQuery).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const deleteUserDataPromises = Object.keys(data).map((key) =>
              remove(ref(db, `${table}/${key}`))
            );
            return Promise.all(deleteUserDataPromises);
          }
          return Promise.resolve(); // No data exists in this table
        });
      });

      // Delete user data from the User table
      const userRef = ref(db, `User/${userId}`);
      const deleteUserDataPromise = remove(userRef);

      // Wait for all deletions to complete
      await Promise.all([...deletePromises, deleteUserDataPromise]);

      // Delete the Firebase Authentication account
      await deleteUser(user);

      // Show success SweetAlert
      Swal.fire({
        title: "Account Deleted!",
        text: "Your account and data have been deleted successfully.",
        icon: "success",
        customClass: {
          confirmButton: styles.confirmButton, // Green button for info dialog
        },
      });

      // Clear local storage and redirect
      localStorage.clear();
      closeModal();
      navigate("/signin"); // Redirect to sign-in page
    } catch (error) {
      // Check if the error is related to wrong password
      if (error.code === "auth/requires-recent-login") {
        // Show error SweetAlert for wrong password
        Swal.fire({
          title: "Authentication Failed",
          text: "Your session has expired. Please log in again and try deleting your account.",
          icon: "error",
        });
      } else {
        // Show general error message
        Swal.fire({
          title: "Error",
          text: `Failed to delete account and data: ${error.message}`,
          icon: "error",
        });
      }
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
    <div className={styles.containerFluid} style={{ marginBottom: "20px" }}>
      <Navbar />
      <hr />
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
                <input
                  className={styles.input}
                  placeholder="Enter Your Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
                    width="110px"
                    height="110px"
                    alt="Profile"
                  />
                  <FaRegEdit
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
        <div className="row">
          <div className="col-md-4">
            <div
              className={`${styles.settings} ${styles.hoverEffect}`}
              onClick={about}
            >
              <div>
                <img src={information} width="60" alt="About App" />
                <p>About App</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`${styles.settings} ${styles.hoverEffect}`}>
              <div>
                <img src={folder} width="60" alt="Privacy Policy" />
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className={`${styles.settings} ${styles.hoverEffect}`}
              onClick={handleResetPassword}
            >
              <div>
                <img src={resetPassword} width="60" alt="Reset Password" />
                <p>Reset Password</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className={`${styles.settings} ${styles.hoverEffect}`}
              onClick={openModal}
            >
              <div>
                <img src={del} width="70" alt="Delete Account" />
                <p>Delete Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
