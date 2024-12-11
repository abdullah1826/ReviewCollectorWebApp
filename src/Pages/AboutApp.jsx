import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../Pages/About.module.css";
const AboutApp = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // Go back to the previous page
      };
  return (
    <div className={styles.containerFluid}>
    <Navbar />
    <hr />
    <div className="container">
      <div className="row">
      <button className={styles.backbtn} onClick={handleBack}>Back</button>
        <div className="col-md-12">
        <h2 style={{textAlign:'center',fontWeight:'bold'}} className="my-5">Welcome to ReviewCollector!</h2>
        <p style={{textAlign:'center',fontSize:'18px'}}>Our app makes it easy for businesses to gather and manage online reviews. With just a scan or a link, customers can leave feedback effortlessly, boosting positive engagement. You can also track and filter feedback in the dashboard.</p>
        <p style={{textAlign:'center',fontSize:'18px'}}>Moreover, users can easily integrate their business review page details within the app. With ReviewCollector, all feedback gathered can be conveniently accessed and filtered by month and rating through the intuitive dashboard interface.</p>
        <h2 style={{textAlign:'center',fontWeight:'bold', color: '#2bce67'}} className="my-4">Empowering Businesses, Simplifying Reviews.</h2>
        </div>
               
    </div>
  </div>
  </div>
  )
}

export default AboutApp
