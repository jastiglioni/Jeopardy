import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <div>
            <h1>Welcome to Stand Up Trivia!</h1>
            <div>
            <Link to="/trivia">Click Here for Trivia!</Link>
            <br/>
            <Link to="/buzzer">Enable Your Buzzer Here!</Link>
            </div>
        </div>
    )
}

export default Home
