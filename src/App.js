// import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";
import { sendSignInLinkToEmail, EmailAuthProvider } from "firebase/auth";
import { auth } from './firebaseConfig';
import * as firebaseui from "firebaseui"

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost',
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

function SignInButton (props) {
  const handleClick = () => {
    const email = "bcommandeur@gmail.com"
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>
        Sign in with Email
      </button>
    </div>
  )
}

function App() {
  
  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID
      ],
      // Other config options...
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div id="firebaseui-auth-container"></div>
        <SignInButton/>
      </header>
    </div>
  );
}

export default App;
