// Import the functions you need from the SDKs you need
// const firebase = require("firebase/app");

const {initializeApp} = require("firebase/app");
const {getDatabase} = require("firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc-6htarbmvn1n-3wzFFRLJozuFFDr_YA",
  authDomain: "mock-form-a5e71.firebaseapp.com",
  databaseURL: "https://mock-form-a5e71-default-rtdb.firebaseio.com",
  projectId: "mock-form-a5e71",
  storageBucket: "mock-form-a5e71.appspot.com",
  messagingSenderId: "889998547480",
  appId: "1:889998547480:web:f24f339ce29c8a3f8fc16d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = db;
