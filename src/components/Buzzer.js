import '../styles/Button.css'
import React, {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
//import db from './dbConfig'
import * as FireStoreService from '../services/dbConfig'
import bee from './bee.png'

//const auth = FireStoreService.auth



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

    const signOut = (e) => {
      e.preventDefault()
      FireStoreService.signOut()
    }
  return (
    <button className="sign-out" onClick={signOut}>Sign Out</button>
  )
}

const Button = (props) => {
  const [click, setClick] = useState('Blue')
  const [name] = useState(props.name)


const hook = () => {
  const unsubscribe = FireStoreService.getButtonStatus({
    next: dbSnapshot => {
      if (dbSnapshot.data().name === name) {
        setClick('Green')
      } else if (dbSnapshot.data().name === 'Buzzer Active') {
        setClick('Blue')
      } else {
        setClick('Red')
      }
    },
    error: () => console.log("there is an error with hook")
  })
  return unsubscribe
}

  useEffect(hook, [name, setClick])

  const [barStatus, setBarStatus] = useState(false)



    const hook2 = () => {
        const unsubscribe = FireStoreService.readBuzzerStatus({
          next: dbSnapshot => {
            setBarStatus(dbSnapshot.data().status)
            // setBarStatus(dbSnapshot.doc("Buzzer").data().status)
          },
          error: () => console.log("there is an error with hook on popup")
        })
        return unsubscribe
      }

      useEffect(hook2, [barStatus, setBarStatus])


  const changeColor = async (e) => {
    e.preventDefault();
if (!barStatus) {

} else {
    FireStoreService.getBuzzUser().then(doc => {
      
      if (doc.exists) {
        const data = doc.data()
        if (!data.buzzer || (data.name === name)) {
          console.log(`${props.name} buzzed in >:^(`)
          FireStoreService.setBuzzUser(name)
          setClick('Green')
        } else if (data.name === 'Buzzer Active'){
          setClick('Blue')
        } else {
          setClick('Red')
        }
      } 
      
      else {
        console.log("The BuzzUser document doesn't exist")
      }
    
      }).catch(error => {
        console.log("Error getting document: ", error)
      }) 

    }  }

 
  
 
  
 return (
    <>
      <h1>Hello {name}</h1>
      <button className={`button${click}`} onClick={changeColor}><img src={bee} alt="bee" width="300" height="300" /></button>
      <br/>
      
     
    </>
  )}

 function Buzzer() { 
  
  const [user] = useAuthState(FireStoreService.auth)
  const [name, setName] = useState('')

  const setUser = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  return (
    <div className="App">
    <header>
    
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
