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
  
  export const db = firebase.firestore()
  export const auth = firebase.auth()
  const docRefBuzzUser = db.collection("trivia").doc("Buzzer")
  const docRefBuzzStatus = db.collection("trivia").doc("Bar")



  export const signInAnon = () => {
    return (
      auth.signInAnonymously()
          .then(() => {
            console.log("user is signed in");
      })
    )
  }

  export const signOut = () => {
    return (
      auth.signOut()
    )
  }

  export const getBuzzUser = async () => {
    return (
      await docRefBuzzUser.get()
    )
  }

  export const setBuzzUser = async (name) => {
    return (
      await docRefBuzzUser.update({
        name: name,
        buzzer: true
      })
    )
  }

  // this function returns Bar doc in firebase
  // must specify doc.data().status to get status
  export const getBuzzBarStatus = async () => {
    return (
      await docRefBuzzStatus.get()
    )
  }

  export const resetBuzzUser = async () => {
    return (
      await docRefBuzzUser.update({
        name: "Buzzer Active",
        buzzer: false
      })
    )
  }

  export const toggleBuzzBar = async () => {
    const status = getBuzzBarStatus.then(doc => {
      if (doc.exist) {
        return doc.data().status
      }
    })

    return (
      await docRefBuzzStatus.update({
        status: !status
      })
    )
  }

  export const getButtonStatus = async () => {
    return (
      await docRefBuzzUser.onSnapshot()
    )
  }




  export default firebase