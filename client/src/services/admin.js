const { initializeApp } = require('firebase/app')

//const firebaseConfig = require("./MIT-Auth-Routes.json");

const firebaseConfig = {
  apiKey: "AIzaSyCIdgP5UepZYNJfegdUxhEaZl_lCNz3m8U",
  authDomain: "badbank-87112.firebaseapp.com",
  projectId: "badbank-87112",
  storageBucket: "badbank-87112.appspot.com",
  messagingSenderId: "641621008693",
  appId: "1:641621008693:web:b54539d980a6319156ec7c"
};

const loginApp = initializeApp(firebaseConfig);

export { loginApp }