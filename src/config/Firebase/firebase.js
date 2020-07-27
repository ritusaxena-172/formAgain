import firebase from 'firebase/app';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyDi8ZRqWL9SzLk4DsJ7GJO9prFKGzaHefQ",
    authDomain: "formapp-9ce71.firebaseapp.com",
    databaseURL: "https://formapp-9ce71.firebaseio.com",
    projectId: "formapp-9ce71",
    storageBucket: "formapp-9ce71.appspot.com",
    messagingSenderId: "362021350904",
    appId: "1:362021350904:web:9d95035962acdf4ca8ba0d",
    measurementId: "G-6RDPSPBCKC"
  };

  firebase.initializeApp(firebaseConfig)
  export const firestore = firebase.firestore()
