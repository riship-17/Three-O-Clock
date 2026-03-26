import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQNVBuK7ZPQ7J5cWbc7gR4yt1rKxUBr_o",
  authDomain: "three-o-clock.firebaseapp.com",
  projectId: "three-o-clock",
  storageBucket: "three-o-clock.firebasestorage.app",
  messagingSenderId: "482858672835",
  appId: "1:482858672835:web:0f288d969a75e25a1fb876"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
