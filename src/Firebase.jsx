import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

//test 
// const firebaseConfig = {
//   apiKey: "AIzaSyCU-X-ZiyEhFByeSg9-Jx5plwnqtbViP-8",
//   authDomain: "review-collector-test.firebaseapp.com",
//   databaseURL: "https://review-collector-test-default-rtdb.firebaseio.com",
//   projectId: "review-collector-test",
//   storageBucket: "review-collector-test.firebasestorage.app",
//   messagingSenderId: "44380194645",
//   appId: "1:44380194645:web:dad037f7643f56362491dc",
//   measurementId: "G-DE7MQKRWPD"
// };
//real
 const firebaseConfig = {
  apiKey: "AIzaSyD1Y6qXoGkCPIwTbGwZY4VfCTUCJf9-rBw",
  authDomain: "review-collector-a7be7.firebaseapp.com",
  databaseURL: "https://review-collector-a7be7-default-rtdb.firebaseio.com",
  projectId: "review-collector-a7be7",
  storageBucket: "review-collector-a7be7.appspot.com",
  messagingSenderId: "52650718458",
  appId: "1:52650718458:web:784a8139bbff2a602e0543",
  measurementId: "G-97QR8RD7GD"
};

  const app = initializeApp(firebaseConfig);

  export default app;


  