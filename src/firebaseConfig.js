import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { firestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
  apiKey: "AIzaSyDTNJQB9j04X-7BZMNMYwiW7GCzR3S7hFk",
  authDomain: "screenrank-bcmdr.firebaseapp.com",
  projectId: "screenrank-bcmdr",
  storageBucket: "screenrank-bcmdr.appspot.com",
  messagingSenderId: "106266079148",
  appId: "1:106266079148:web:5030c2b0f9fd30ab401409",
  measurementId: "G-S9GFS2Q30T"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);

export {
  auth,
  analytics,
}