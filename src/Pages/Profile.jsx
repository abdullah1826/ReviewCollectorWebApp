import { useState } from "react";
import styles from "../Pages/Profile.module.css";
import Navbar from "../components/Navbar";
import { IoEyeSharp, IoQrCodeOutline, IoAddOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import coverpic from "../assets/images/image.jpg";
import QRCode from "react-qr-code";

const Profile = () => {
  const navigate = useNavigate();
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [manageProfileModal , setshowManageProfileModal] = useState(false);
  const shareData = "https://example.com/your-share-link";

  const handleEditClick = () => {
    navigate("/manageProfile");
  };

  const handleAddProfileClick = () => {
    setShowAddProfileModal(true);
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };
  const handleManageProfileClick = () => {
    setshowManageProfileModal(true);
  };

  const closeModal = () => {
    setShowAddProfileModal(false);
    setShowShareModal(false);
    setshowManageProfileModal(false);
  };
  return (
    <div className={styles.containerFluid}>
      <Navbar />
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-6" style={{ position: 'relative' }}>
            <div className={styles.profileSection}>
              <div className={styles.coverImage}>
                <img src={coverpic} alt="Cover" />
              </div>
              <div className={styles.profie}>
                <img src={coverpic} alt="Profile" className={styles.profileImage} />
                <button className={styles.addprofile} onClick={handleAddProfileClick}>
                  <IoAddOutline style={{fontSize:"20px"}} /> Add Profile
                </button>
                <div className={styles.profileDetails}>
                  <h4>Avicenna Enterprise Solutions</h4>
                  <p>+92 300 000 0000</p>
                  <p>email.avicenna@gmail.com</p>
                </div>
              </div>
              <div className="text-center my-3">
                <button className={styles.manageButton} onClick={handleManageProfileClick}>
                <IoSettingsSharp  style={{fontSize:"20px"}} />Manage Profiles
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className={styles.actionButtons}>
              <button>
                <p>Preview</p>
                <IoEyeSharp className={styles.icon} />
              </button>
              <button onClick={handleShareClick}>
                <p>Share</p>
                <IoQrCodeOutline className={styles.icon} />
              </button>
              <button onClick={handleEditClick}>
                <p>Edit</p>
                <FaRegEdit className={styles.icon} />
              </button>
            </div>

            <div className={styles.listGroup}>
              <div style={{ display: 'flex', justifyContent: "space-between", padding: "10px 20px" }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                  <FcGoogle style={{ fontSize: "42px" }} />
                  <span>Direct</span>
                </div>
                <input type="radio" name="fav_language" style={{ width: "20px" }} />
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: "space-between", padding: "10px 20px" }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                  <FcGoogle style={{ fontSize: "42px" }} />
                  <span>Enable Survey</span>
                </div>
                <input type="radio" name="fav_language" style={{ width: "20px" }} />
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: "space-between", padding: "10px 20px" }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                  <FcGoogle style={{ fontSize: "42px" }} />
                  <span>Turn Review Link Off</span>
                </div>
                <input type="radio" name="fav_language" style={{ width: "20px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showAddProfileModal && (
          <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div style={{display:'flex',alignItems:"center"}}> 
              <h2>Add New Profile</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <IoIosClose />
              </button>
            </div>
            <div className={styles.profileIcon}>
              <img src={coverpic} alt="Profile Icon" />
            </div>
            <form className={styles.form}>
            <label>Full Name</label>
              <input type="text" required />
              <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                <div style={{width:'48%'}}>
                <label>Email</label>
                <input type="email" required />
                </div>
                <div style={{width:'48%'}}>
                <label>Password</label>
                <input type="password" required />
                </div>
              </div>
              <button type="submit" className={styles.submitButton}>Create Profile</button>
            </form>
          </div>
        </div>
      )}
         {/* Share Modal */}
         {showShareModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{width:'500px'}}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <div style={{display:"flex", justifyContent:"center",alignItems:'center',marginTop:'50px'}}>
              <div>
                <h2 style={{textAlign:'center',fontSize:"30px"}} >Share QR Code</h2>
                <p style={{fontSize:'22px'}}>Scan this QR Code to share your profile</p>
                <QRCode value={shareData} size={150} />
              </div>

            </div>
            <button className={styles.sharebtn}>Share Now</button>

          </div>
        </div>
      )}
      {manageProfileModal && (
          <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{width:'600px'}}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <p style={{fontSize:"22px",fontWeight:"600",textAlign:"left"}}>Add New Profile</p>
            <div style={{marginTop:'30px'}}>
               <div className={styles.mainProfile}>
                 <div style={{display:'flex',alignItems:"center"}}>
                  <div style={{display:'flex'}}>
                  <img src={coverpic} width="70"/>
                   <div>
                      <h4>Avicenna Enterprise Solutions</h4>
                      <p style={{textAlign:'left'}}>email.avicenna@gmail.com</p>
                   </div>
                  </div>
                 </div>
                 <hr></hr>
                 <div className="User_Profile" style={{display:'flex',alignItems:"center",marginTop:"10px",justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:"center"}}>
                    <div style={{display:'flex'}}>
                        <img src={coverpic} width="70"/>
                      <div>
                          <h4>Avicenna Enterprise Solutions</h4>
                          <p style={{textAlign:'left'}}>email.avicenna@gmail.com</p>
                     </div>
                    </div>
                  </div>
                  <div>
                  <FaRegEdit style={{fontSize:"25px"}}/>
                  <RiDeleteBin6Line style={{fontSize:"25px"}}/>
                    </div>             
                 </div>
                 <div className="User_Profile" style={{display:'flex',alignItems:"center",marginTop:"10px",justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:"center"}}>
                    <div style={{display:'flex'}}>
                        <img src={coverpic} width="70"/>
                      <div>
                          <h4>Avicenna Enterprise Solutions</h4>
                          <p style={{textAlign:'left'}}>email.avicenna@gmail.com</p>
                     </div>
                    </div>
                  </div>
                  <div>
                  <FaRegEdit style={{fontSize:"25px"}}/>
                  <RiDeleteBin6Line style={{fontSize:"25px"}}/>
                    </div>
              
                 </div>  <div className="User_Profile" style={{display:'flex',alignItems:"center",marginTop:"10px",justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:"center"}}>
                    <div style={{display:'flex'}}>
                        <img src={coverpic} width="70"/>
                      <div>
                          <h4>Avicenna Enterprise Solutions</h4>
                          <p style={{textAlign:'left'}}>email.avicenna@gmail.com</p>
                     </div>
                    </div>
                  </div>
                  <div>
                  <FaRegEdit style={{fontSize:"25px"}}/>
                  <RiDeleteBin6Line style={{fontSize:"25px"}}/>
                    </div>
              
                 </div>
               
               </div>
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default Profile;






