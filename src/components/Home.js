import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <div>
            <h1>Buzzer</h1>
            <div>
            <Link to="/trivia">Click Here for Trivia!</Link>
            <br/>
            <Link to="/buzzer">Enable Your Buzzer Here!</Link>
            </div>
        </div>
    )
}

export default Home
