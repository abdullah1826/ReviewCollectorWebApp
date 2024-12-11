import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
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