// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIdgP5UepZYNJfegdUxhEaZl_lCNz3m8U",
  authDomain: "badbank-87112.firebaseapp.com",
  projectId: "badbank-87112",
  storageBucket: "badbank-87112.appspot.com",
  messagingSenderId: "641621008693",
  appId: "1:641621008693:web:b54539d980a6319156ec7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const serviceAccount = require("./MIT-Auth-Routes.json");

module.exports = app;