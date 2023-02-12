import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"


const firebaseConfig = {
  "apiKey": "AIzaSyD6Q4GR2i-LZmeBhLgkp7tjt99yu54WIQQ",
  "authDomain": "badbank-d105e.firebaseapp.com",
  "projectId": "badbank-d105e",
  "storageBucket": "badbank-d105e.appspot.com",
  "messagingSenderId": "953333433177",
  "appId": "1:953333433177:web:de4ae1b9202129cfc60248"  
}

const app = initializeApp(firebaseConfig)


function doLogin (userInfo) {
  return new Promise((resolve, reject) => {
    const auth  = getAuth(app)
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
