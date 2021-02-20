import firebase from 'firebase'


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDQeMfG15IFXgDT_5RYOQferU7pds7E0Fc",
    authDomain: "trivia-7a705.firebaseapp.com",
    projectId: "trivia-7a705",
    storageBucket: "trivia-7a705.appspot.com",
    messagingSenderId: "775258286646",
    appId: "1:775258286646:web:797eec688d5ffd16708697"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase