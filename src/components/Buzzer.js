import '../styles/Button.css'
import React, {useState} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import db from './dbConfig'

const auth = db.auth()
const firestore = db.firestore()
const docRef = firestore.collection("trivia").doc("Buzzer");
const docRefBuzzBar = firestore.collection("trivia").doc("Bar");

//console.log("Hey " + docRefBuzzBar.get());


const SignIn = (props) => {
 
  
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
        <input placeholder="enter your name here" onChange={props.func}></input>
        <button type="submit" >Sign Into Trivia</button>
      </form>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

const Button = (props) => {
  const [click, setClick] = useState('Blue')
  //const docRef = firestore.collection("cities").doc("SF");

  docRef.onSnapshot((doc) => {
    if (doc.exists) {
       if (doc.data().name === props.name) {
         setClick('Green')
       } else {
         setClick('Red')
         
       } 
     } else {
      setClick('Blue')
    }
   })


  
  const changeColor = async (e) => {
    e.preventDefault();

    
    await docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Hey that document exists!");
          setClick('Red')
      } else {
          setClick('Green')
          docRef.set({
            name: props.name,
            buzzer: true
          })  
            console.log("You buzzed in!");
      }
      
    }).catch((error) => {
        console.log("Error getting document:", error);
      });



    }


    const toggleBuzzerBar = async(e) => {
      e.preventDefault();

      await docRefBuzzBar.get().then((doc) => {
        if (doc.exists) {
            docRefBuzzBar.set({
              status: !doc.data().status
            })
        } else {
          docRefBuzzBar.set({
            status: true
          })
            }   
      })

    }
  

  const reset = async () => {
    setClick('Blue')
    await docRef.delete().then(() => {
      console.log("db reset");
    });
  }
  
 return (
    <>
      <h2>Hello {props.name}</h2>
      <button className={`button${click}`} onClick={changeColor}>CLICK ME TO BUZZ IN</button>
      <br/>
      <button onClick={reset}>Reset Database & Buzzah!</button>
      <br/>
      <br/>
      <button onClick={toggleBuzzerBar}>TURN ON BUZZER</button>
    </>
  )}

 function Buzzer() { 
  
  const [user] = useAuthState(auth)
  const [name, setName] = useState('')

  const setUser = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  return (
    <div className="App">
    <header>
    <Link to="/">Home Page</Link>
      <h1>Welcome to Trivia Buzzer</h1>
      
    </header>

    <div>
      {user ? <Button name={name}/> : <SignIn func={setUser}/>}
    </div>
    <br/>
    <br/>
    <SignOut />
  </div>
  )
}

export default Buzzer;
