import '../styles/Button.css'
import React, {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
//import db from './dbConfig'
import * as FireStoreService from '../services/dbConfig'

const auth = FireStoreService.auth



//console.log("Hey " + docRefBuzzBar.get());


const SignIn = (props) => {
 
  
  const signIn = (e) => {
    e.preventDefault()
    FireStoreService.signInAnon()
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

    const signOut = () => {
      FireStoreService.signOut()
    }
  return auth.currentUser && (
    <button className="sign-out" onClick={signOut}>Sign Out</button>
  )
}

const Button = (props) => {
  const [click, setClick] = useState('Blue')
  //const docRef = firestore.collection("cities").doc("SF");

  const hook = (props) => {FireStoreService.getButtonStatus(doc => {
    if (doc.data().name === props.name) {
      console.log("the props name is: ", props.name);
      setClick('Green')
    } else if (doc.data().name === "Buzzer Active") {
      setClick('Blue')
    } else {
      setClick('Red')
    }
  })
}

  useEffect(hook, [])

  
  const changeColor = async (e) => {
    e.preventDefault();

    FireStoreService.getBuzzUser().then(doc => {
      
      if (doc.exists) {
        const data = doc.data()

        if (data.buzzer) {
          console.log("Someone buzzed in before you")
          setClick('Red')
        } else {
          console.log(`${props.name} buzzed in first!`)
          FireStoreService.setBuzzUser(props.name)
          setClick('Green')
        }
      } 
      
      else {
        console.log("The BuzzUser document doesn't exist")
      }
    
      }).catch(error => {
        console.log("Error getting document: ", error)
      }) 

  }

  const toggleBuzzerBar = async(e) => {
    e.preventDefault();
    FireStoreService.toggleBuzzBar((await FireStoreService.getBuzzBarStatus()).data().status)
    //console.log((await FireStoreService.getBuzzBarStatus()).data())
  }
  
  const reset = async (e) => {
    e.preventDefault()
    setClick('Blue')
    FireStoreService.resetBuzzUser()
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
