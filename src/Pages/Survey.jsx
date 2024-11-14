import Navbar from '../components/Navbar';
import styles from '../Pages/Survey.module.css';
import { useState } from 'react';


const Survey = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle modal visibility
    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
  return (
    <div className={styles.containerFluid}>
    <Navbar />
       <hr />
    <div className="container">
      {/* Search and Filter Section */}
      <div className={`row mb-4 ${styles.search}`} >
        <div className="col-md-10">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <div className="col-md-2">
          <button className={`btn btn-outline-secondary btn-block ${styles.btn}`}>Filters</button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className={`card-body ${styles.cardbody}`}  onClick={openModal}>
              <div className="flex-grow-1 d-flex">
                <img src=''/>
              <img src="https://via.placeholder.com/50" className="rounded-circle mr-3" alt="User" width="70px" height="75px" />
              <div style={{height:'100px',overflow:'hidden'}}>
              <h5 className={styles.heading}>Persona Dam</h5>
              <p className="card-text small text-muted">Loer m ipsum doler review sigma mega giga sina meta hexa tera nina jira</p>
              </div>     
              </div>
              <div>
                <div className="small text-muted">12-09-2024</div>
                <div className={`${styles.statusUnsatisfactory} p-2 mb-1`}>Unsatisfactory</div>
                <div className={styles.starRating}>
                  <span>&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span>
                </div>
              </div>
            </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className={`card-body ${styles.cardbody}`}  onClick={openModal}>
              <div className="flex-grow-1 d-flex">
                <img src=''/>
              <img src="https://via.placeholder.com/50" className="rounded-circle mr-3" alt="User" width="70px" height="75px" />
              <div style={{height:'100px',overflow:'hidden'}}>
              <h5 className={styles.heading}>Persona Dam</h5>
              <p className="card-text small text-muted">Loer m ipsum doler review sigma mega giga sina meta hexa tera nina jira</p>
              </div>     
              </div>
              <div>
                <div className="small text-muted">12-09-2024</div>
                <div className={`${styles.statusUnsatisfactory} p-2 mb-1`}>Unsatisfactory</div>
                <div className={styles.starRating}>
                  <span>&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span>
                </div>
              </div>
            </div>
        </div>      <div className="col-md-6 mb-4">
          <div className={`card-body ${styles.cardbody}`}  onClick={openModal}>
              <div className="flex-grow-1 d-flex">
                <img src=''/>
              <img src="https://via.placeholder.com/50" className="rounded-circle mr-3" alt="User" width="70px" height="75px" />
              <div style={{height:'100px',overflow:'hidden'}}>
              <h5 className={styles.heading}>Persona Dam</h5>
              <p className="card-text small text-muted">Loer m ipsum doler review sigma mega giga sina meta hexa tera nina jira</p>
              </div>     
              </div>
              <div>
                <div className="small text-muted">12-09-2024</div>
                <div className={`${styles.statusUnsatisfactory} p-2 mb-1`}>Unsatisfactory</div>
                <div className={styles.starRating}>
                  <span>&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span>
                </div>
              </div>
            </div>
        </div>      <div className="col-md-6 mb-4">
          <div className={`card-body ${styles.cardbody}`}  onClick={openModal}>
              <div className="flex-grow-1 d-flex">
                <img src=''/>
              <img src="https://via.placeholder.com/50" className="rounded-circle mr-3" alt="User" width="70px" height="75px" />
              <div style={{height:'100px',overflow:'hidden'}}>
              <h5 className={styles.heading}>Persona Dam</h5>
              <p className="card-text small text-muted">Loer m ipsum doler review sigma mega giga sina meta hexa tera nina jira</p>
              </div>     
              </div>
              <div>
                <div className="small text-muted">12-09-2024</div>
                <div className={`${styles.statusUnsatisfactory} p-2 mb-1`}>Unsatisfactory</div>
                <div className={styles.starRating}>
                  <span>&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span><span className="inactive">&#9733;</span>
                </div>
              </div>
            </div>
        </div>


      </div>
       {/* Modal */}
       {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <h4 style={{fontSize:"22px",fontFamily:"Poppins",fontWeight:"400",marginBottom:"50px"}}>Feedback Details</h4>
            <h5 style={{fontSize:"17px",fontFamily:"Poppins",fontWeight:"400",color:'#8D8D8D'}}>Full Name</h5>
            <p style={{fontSize:"18px",fontWeight:"600"}}>Persona Dam</p>
            <h5 style={{fontSize:"17px",fontFamily:"Poppins",fontWeight:"400",color:'#8D8D8D'}}>Email</h5>
            <p style={{fontSize:"18px",fontWeight:"600"}}>personadam@mail.com</p>
            <h5 style={{fontSize:"17px",fontFamily:"Poppins",fontWeight:"400",color:'#8D8D8D'}}>Feedback</h5>
            <p style={{fontSize:"18px",fontWeight:"600"}}>Loer m ipsum doler review sigma mega giga sina meta hexa tera nina jLoer m ipsum doler review sigma mega giga sina meta hexa tera nina jiraira</p>
            <hr></hr>
            <div style={{display:"flex",justifyContent:'space-between'}}>
              <div className='stars'>
                <span className={styles.inactive}>&#9733;</span><span className={styles.inactive}>&#9733;</span><span className={styles.inactive}>&#9733;</span><span className={styles.inactive}>&#9733;</span><span className={styles.inactive}>&#9733;</span>

              </div>
              <button style={{backgroundColor:'#FF9E9E',borderRadius:"17px",padding:"10px",border:'none'}}>Unsatisfactory</button>
            </div>

          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Survey;


