import React from 'react'
import './Popup.css'

const Answer = (props) => {

          return (props.flag) ? (
            <div className="answerTrue">
            {props.answer}
        </div>
          ) : <div className="answerFalse">{props.answer}</div> 
    
}

export default Answer
