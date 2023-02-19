import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

//intialize App
const firebaseConfig = {
  apiKey: "AIzaSyCIdgP5UepZYNJfegdUxhEaZl_lCNz3m8U",
  authDomain: "badbank-87112.firebaseapp.com",
  projectId: "badbank-87112",
  storageBucket: "badbank-87112.appspot.com",
  messagingSenderId: "641621008693",
  appId: "1:641621008693:web:b54539d980a6319156ec7c"
};

const loginApp = initializeApp(firebaseConfig);


function doLogin (userInfo) {
  return new Promise((resolve, reject) => {
    const auth  = getAuth(loginApp)
    const promise = signInWithEmailAndPassword( auth,
      userInfo.email, userInfo.password);

    promise
      .then( (res) => {
        resolve(res)
      })
      .catch( (err)  => {
        reject(err)
      });
  });
};

const doGoogleLogin = () => {
  /*return new Promise((resolve, reject) => {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope("email");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => resolve(result.user.email))
      .catch((err) => reject(err));
  });*/
};

export { doLogin }
