//Initialize firebaseApp if it has not been done yet
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyCIdgP5UepZYNJfegdUxhEaZl_lCNz3m8U",
  authDomain: "badbank-87112.firebaseapp.com",
  projectId: "badbank-87112",
  storageBucket: "badbank-87112.appspot.com",
  messagingSenderId: "641621008693",
  appId: "1:641621008693:web:b54539d980a6319156ec7c"
};

// Initialize Firebase
const loginApp = initializeApp(firebaseConfig);



function createUser( userInfo) {
  const auth = getAuth(loginApp);
  return new Promise( (resolve, reject) => {  
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then( userCredential => resolve(userCredential))
      .catch( error => reject(error))
  })
}


module.exports = { createUser }
