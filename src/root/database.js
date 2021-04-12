import "firebase/analytics";
import "firebase/database";

import firebase from "firebase/app";

const config = {
  appId: "1:244460956535:web:aa001a06fe811cf8fc8f72",
  apiKey: "AIzaSyCecMBc77iTkLHbUL6Jg6LDNxWkWQO2mWw",
  authDomain: "greenback-boogie-61a46.firebaseapp.com",
  databaseURL: "https://greenback-boogie-61a46-default-rtdb.firebaseio.com",
  messagingSenderId: "244460956535",
  projectId: "greenback-boogie-61a46",
  storageBucket: "greenback-boogie-61a46.appspot.com",
};

firebase.initializeApp(config);

export const database = firebase.database();
