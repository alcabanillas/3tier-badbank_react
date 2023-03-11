import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

//intialize App
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const authApp = initializeApp(firebaseConfig);

const auth = getAuth(authApp);
setPersistence(auth, browserSessionPersistence)

function doLogin(userInfo) {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const promise = signInWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );

    promise
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function doGoogleLogin (){
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        resolve(result)})
      .catch((err) => {
        reject(err)});
  });
};

function doLogout(){
  return new Promise((resolve, reject) => {
    const auth = getAuth(authApp)
    const promise = auth.signOut()

    promise
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });  
}


export { doLogin, doGoogleLogin, doLogout }
