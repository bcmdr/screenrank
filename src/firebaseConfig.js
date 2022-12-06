import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { firestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const app = initializeApp({
  apiKey: "AIzaSyDkpVk9Cj4UebPBRsVk9_I6dB4GGxkdmDQ",
  authDomain: "screenlist-bcmdr.firebaseapp.com",
  projectId: "screenlist-bcmdr",
  storageBucket: "screenlist-bcmdr.appspot.com",
  messagingSenderId: "935128397813",
  appId: "1:935128397813:web:c1b1b209850abf77d452bc",
  measurementId: "G-MFRPFBCFF9"
});

const analytics = getAnalytics(app);
const auth = getAuth(app);

export {
  auth,
  analytics,
}