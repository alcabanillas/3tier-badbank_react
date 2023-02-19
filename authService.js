const firebaseApp = require("./admin")
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const auth = getAuth();

function createUser( userInfo) {
  return new Promise( (resolve, reject) =>{  createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    .then( (userCredential) => resolve(userCredential))
    .catch((error) => reject(error))
  })
/*  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });*/
}




module.exports = { createUser }
