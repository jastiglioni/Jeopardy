import React from 'react'
import './Tile.css'
import Popup from './Popup'

const Tile = (props) => {
    const togglePopup = () => {

    }

    return (
        <div>
            <button onClick={props.func} className='tile'>{props.obj.value}</button>

            
            {props.obj.show ? <Popup func={() => togglePopup()} answer={props.obj.answer} 
            text={props.obj.text.toUpperCase()} 
               audio={props.obj.audio} /> : ""}
        </div>
    )}

export default Tile

