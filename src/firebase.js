import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQNVBuK7ZPQ7J5cWbc7gR4yt1rKxUBr_o",
  authDomain: "three-o-clock.firebaseapp.com",
  projectId: "three-o-clock",
  storageBucket: "three-o-clock.firebasestorage.app",
  messagingSenderId: "482858672835",
  appId: "1:482858672835:web:0f288d969a75e25a1fb876",
  measurementId: "G-GX81X50JX2" 
};

// Initialize Firebase Core
const app = initializeApp(firebaseConfig);

// Initialize Analytics ONLY when called
let analytics = null;
export const initAnalytics = () => {
  if (typeof window !== "undefined" && !analytics) {
    analytics = getAnalytics(app);
    console.log("[Firebase] Analytics initialized after consent.");
  }
  return analytics;
};

export default app;
