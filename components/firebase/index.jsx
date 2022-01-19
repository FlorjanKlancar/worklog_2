import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5UPH7kGmrL0-m1wbILIYwsUuSS8ujiAY",
  authDomain: "worklog-9fd49.firebaseapp.com",
  projectId: "worklog-9fd49",
  storageBucket: "worklog-9fd49.appspot.com",
  messagingSenderId: "1097308243573",
  appId: "1:1097308243573:web:7b21cfdb2fc0cb276f5a3c",
  measurementId: "G-FB23HDBRX8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};
