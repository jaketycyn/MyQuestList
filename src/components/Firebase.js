import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
const config = {
  apiKey: "AIzaSyAeswooV8visngXDYelgsFas_QIEeIhz7E",
  authDomain: "myjournal-27420.firebaseapp.com",
  databaseURL: "https://myjournal-27420.firebaseio.com",
  projectId: "myjournal-27420",
  storageBucket: "myjournal-27420.appspot.com",
  messagingSenderId: "935255028201",
  appId: "1:935255028201:web:236b6368c6bf32f71c9b78",
  measurementId: "G-1QD5VRCWK9"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.firestore();
