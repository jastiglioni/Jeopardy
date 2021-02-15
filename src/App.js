import './App.css'
import './Button.css'
import {useState} from 'react'
import firebase from 'firebase'
//import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

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
const auth = firebase.auth()
const firestore = firebase.firestore()



const SignIn = () => {
 // const [name, setName] = useState('')
  
  const signIn = (e) => {
    e.preventDefault()
    auth.signInAnonymously()
      .then(() => {
        console.log("user is signed in");
       // setName(e.target.value)
      })
    }

  return (
    <>
      <form onSubmit={signIn}>
        <input placeholder="enter your name here"></input>
        <button type="submit">Sign Into Trivia</button>
      </form>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

const Buzzer = (props) => {
  const [click, setClick] = useState('Blue')
  const docRef = firestore.collection("cities").doc("SF");

  docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Hey that document exists!");
        setClick('Red')
    }
  })
  
 

  const changeColor = async (e) => {
    e.preventDefault();

    
    await docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Hey that document exists!");
          setClick('Red')
      } else {
          // doc.data() will be undefined in this case
          setClick('Green')
          docRef.set({
            name: "Jacob Castiglioni", state: "JC", country: "USA",
            capital: true, population: 1000000,
            regions: ["new_england", "northeast"] });   
            console.log("You buzzed in!");
      }
      
    }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }

  const reset = async () => {
    setClick('Blue')
    await docRef.delete().then(() => {
      console.log("db reset");
    });
  }
  
 return (
    <>
      <h1>Big Ol' Button</h1>
      <h2>Hello {props.user}</h2>
      <button className={`button${click}`} onClick={changeColor}>CLICK ME TO BUZZ IN</button>
      <button onClick={reset}>Reset Database & Buzzah!</button>
    </>
  )}

 function App() { 
  
  const [user] = useAuthState(auth)

  return (
    <div className="App">
    <header>
      <h1>Welcome to Trivia Buzzer</h1>
      <SignOut />
    </header>

    <div>
      {user ? <Buzzer user={user.uid}/> : <SignIn />}
    </div>

  </div>
  )
}

export default App;
