import React from 'react'
import './Popup.css'

const Answer = (props) => {

          return (
            <div className={`answer${props.flag}`}>{props.answer}</div>
          ) 
}

export default Answer
