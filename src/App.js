// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { EmailAuthProvider, onAuthStateChanged, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink  } from "firebase/auth";
import { auth } from './firebaseConfig';

function LoginControl() {

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:3000',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'screenrank.page.link'
  };

  const handleSignIn = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <button onClick={handleSignIn}>Sign In</button>
    </>
  )
}

const email = "bcommandeur@gmail.com";



function App() {
  const [user, setUser] = useState({}); 

  useEffect(() => {
    console.log('Effect on Load');
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href);
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, 
      (user) => {
        if (user) {
          setUser(user);
          console.log(user);
        } else {
          setUser({});
        }
      }
    )
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>{user.name}</div>
        <LoginControl></LoginControl>
      </header>
    </div>
  );
}

export default App;
