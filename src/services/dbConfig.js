import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


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
  export const colRefTrivia = db.collection("trivia")
  export const colRefQuestion = db.collection("question")



  const docRefBuzzUser = colRefTrivia.doc("Buzzer")
  export const docRefBuzzStatus = colRefTrivia.doc("Bar")
  const docRefAnswerCard = colRefTrivia.doc("Answer")
  const docRefPopup = colRefTrivia.doc("Popup")
  
  
  
  
//export const getCategory = 
  
export const toggleQ = async (num) => {
  return (
     colRefQuestion.doc(`q${num}`).update({
      show: ! (await colRefQuestion.doc(`q${num}`).get()).data().show
    })
  )
}

export const readPopup = (obs) => {
  return (
    docRefPopup.onSnapshot(obs)
  )
}

export const getPopup = async () => {
  return (
    await docRefPopup.get()
  )
}

export const setPopup = async (val) => {
  return (
    await docRefPopup.update({
      showPopup: val
    })
  )
}



export const getDB = (observer) => {
  return (
    db.onSnapshot(observer)
  )
}

  export const signInAnon = () => {
    auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
    return (
      auth.signInAnonymously()
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

  export const setBuzzBar = async (val) => {
    return (
      docRefBuzzStatus.update({
        status: val
      })
    )
  }

  export const getButtonStatus = (observer) => {
    return (
       docRefBuzzUser.onSnapshot(observer)
    )
  }


  export const getAnswerCard = (observer) => {
    return (
      docRefAnswerCard.onSnapshot(observer)
    )
  }

  export const setAnswerCard = (val) => {
    return (
      docRefAnswerCard.update({
        answerCard: val
      })
    )
  }

  export const toggleAnswerCard = async () => {
    return (
      docRefAnswerCard.update({
        answerCard: ! (await docRefAnswerCard.get()).data().answerCard
      })
    )
  }

  


  export default firebase