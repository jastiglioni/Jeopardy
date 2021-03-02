import React, {useState, useEffect} from 'react'
import './Tile.css'
import Popup from './Popup'

const Tile = (props) => {
const [value, setValue] = useState(props.obj.value)

const hook = () => {
    if (props.obj.show) {
        setValue("")
    }
}

useEffect(hook, [props.obj.show, setValue])

    return (
        <div>
            <button className='tile'>{value}</button>            
            {props.obj.show ? <Popup answer={props.obj.answer} 
            text={props.obj.text.toUpperCase()} 
               audio={props.obj.audio} /> : ""}
        </div>
    )}

export default Tile

