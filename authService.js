//Initialize firebaseApp if it has not been done yet
const firebaseApp = require("./admin")
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const auth = getAuth();

function createUser( userInfo) {
  return new Promise( (resolve, reject) => {  
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then( userCredential => resolve(userCredential))
      .catch( error => reject(error))
  })
}


module.exports = { createUser }
