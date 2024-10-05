import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA-q4FzxNCfT1UfKqGCxxvO07y16lJRxIQ",
  authDomain: "prod-app-e56ec.firebaseapp.com",
  projectId: "prod-app-e56ec",
  storageBucket: "prod-app-e56ec.appspot.com",
  messagingSenderId: "284645203880",
  appId: "1:284645203880:web:2d2a999b2f854b736c479d",
  measurementId: "G-7XPEE2YW6Z"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
