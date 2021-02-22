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
  export const docRefBuzzStatus = db.collection("trivia").doc("Bar")

export const getDB = (observer) => {
  return (
    db.onSnapshot(observer)
  )
}

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
  export const getDbSnapshot =  (observer) => {
    return (
      db.collection("trivia").onSnapshot(observer)
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

  export const readBuzzerStatus = (observer) => {
    return (
      docRefBuzzStatus.onSnapshot(observer)
    )
  }

  export const toggleBuzzBar = async () => {
   return (
     docRefBuzzStatus.update({
       status: !(await docRefBuzzStatus.get()).data().status
     })
   )
  }

  export const getButtonStatus = (observer) => {
    return (
       docRefBuzzUser.onSnapshot(observer)
    )
  }




  export default firebase