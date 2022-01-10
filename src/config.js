import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0XxalpyzmnEI_Z3c3QQkGk-otXh5Xx9c",
  authDomain: "uhlikata.firebaseapp.com",
  projectId: "uhlikata",
  storageBucket: "uhlikata.appspot.com",
  messagingSenderId: "596971212510",
  appId: "1:596971212510:web:af164dd7c2c5ca334efc4f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
