const { initializeApp } = require('firebase/app')

//const firebaseConfig = require("./MIT-Auth-Routes.json");

const firebaseConfig = {
  "apiKey": "AIzaSyD6Q4GR2i-LZmeBhLgkp7tjt99yu54WIQQ",
  "authDomain": "badbank-d105e.firebaseapp.com",
  "projectId": "badbank-d105e",
  "storageBucket": "badbank-d105e.appspot.com",
  "messagingSenderId": "953333433177",
  "appId": "1:953333433177:web:de4ae1b9202129cfc60248"  
}

const loginApp = initializeApp(firebaseConfig);

export { loginApp }