

// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyAM9aBrUAQTYMp9YPZ-K4y1j8PyZKbCHN4",
  authDomain: "react-crud-1f1ed.firebaseapp.com",
  projectId: "react-crud-1f1ed",
  storageBucket: "react-crud-1f1ed.appspot.com",
  messagingSenderId: "909446863877",
  appId: "1:909446863877:web:4246d5d9e8545fafe8d06c"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const fireDb = getDatabase(app);

export default fireDb;
