import Navbar from "../components/Navbar"
import styles from "../Pages/Dashboard.module.css";
import pops from "../assets/images/Group1.png";
import links from "../assets/images/Group2.png";


const Dashboard = () => {
  return (
    <div className={styles.containerFluid}>
    <Navbar />
    <hr />
    <div className="container">
      <div className="row">
          <div className="col-md-6" >
            <div className={styles.analytics} style={{height:"200px",backgroundColor:'#F6F3F3'}}>
              <div>
                <div style={{display:'flex'}}>
                <img src={pops} width="65px" height="69px"/>
                   <p style={{fontSize:"20px",fontFamily:'Poppins',paddingTop:"20px",paddingLeft:"10px"}}>Pops</p>
                </div>
                <h1 style={{paddingTop:'10px'}}>1789</h1>
              </div>
            </div>
          </div>
          <div className="col-md-6">
          <div className={styles.analytics} style={{height:"200px",backgroundColor:'#F6F3F3'}}>
              <div>
                <div style={{display:'flex'}}>
                <img src={links} width="65px" height="69px"/>
                <p style={{fontSize:"20px",fontFamily:'Poppins',paddingTop:"20px",paddingLeft:"10px"}}>Link Taps</p>

                </div>
                <h1 style={{paddingTop:'10px'}}>323</h1>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.analytics} style={{display:'flex',justifyContent:'space-between',backgroundColor:"#A5FFC6"}}>
                <p style={{fontSize:'32px'}}>Excellent</p>
                <h1>123</h1>
              </div>
          </div>
          <div className="col-md-6">
          <div className={styles.analytics} style={{display:'flex',justifyContent:'space-between' ,backgroundColor:'#B4FFB2'}}>
                <p style={{fontSize:'32px'}}>Good</p>
                <h1>98</h1>
              </div>
          </div>
          <div className="col-md-6">
          <div className={styles.analytics} style={{marginBottom:"20px",display:'flex',justifyContent:'space-between',backgroundColor:'#FEFFC0'}}>
                <p style={{fontSize:'32px'}}>Fair</p>
                <h1>12</h1>
              </div>
          </div>
          <div className="col-md-6">
          <div className={styles.analytics} style={{marginBottom:"20px",display:'flex',justifyContent:'space-between',backgroundColor:'#FFCCC0'}}>
                <p style={{fontSize:'32px'}}>Unsatisfactory</p>
                <h1>31</h1>
              </div>
            </div>
      </div>
    </div>
  </div>
  )
}

export default Dashboard
