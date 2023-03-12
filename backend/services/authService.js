//Initialize firebaseApp if it has not been done yet
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = {
  type: process.env.FIRE_BASE_TYPE,
  project_id: process.env.FIRE_BASE_PROJECT_ID,
  private_key_id: process.env.FIRE_BASE_PRIVATE_KEY_ID,
  private_key: process.env.FIRE_BASE_PRIVATE_KEY,
  client_email: process.env.FIRE_BASE_CLIENT_EMAIL,
  client_id: process.env.FIRE_BASE_CLIENT_ID,
  auth_uri: process.env.FIRE_BASE_AUTH_URI,
  token_uri: process.env.FIRE_BASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIRE_BASE_AUTH_PROVIDER_X509,
  client_x509_cert_url: process.env.FIRE_BASE_CLIENT_X509,
};

// Initialize Firebase
const loginApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function createUser(userInfo) {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    auth
      .createUser({
        displayName: userInfo.name,
        email: userInfo.email, 
        password: userInfo.password
      })
      .then((userCredential) => resolve(userCredential))
      .catch((error) => reject(error));
  });
}

// function used to secure all routes
function verifyToken(req, res, next) {
  try {
    const idToken = req.headers.authorization;

    const auth = getAuth();
    auth
      .verifyIdToken(idToken)
      .then(function () {
        return next();
      })
      .catch(function (error) {
        console.log("Decoded token fail!: " + error);
      });
  } catch (error) {
    return res.status(401).send("You are not authorized");
  }
}

module.exports = { createUser, verifyToken };
