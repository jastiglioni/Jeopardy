import React from 'react'
import './Tile.css'

const Tile = (props) => {

    return (
        <div>
            <button onClick={props.func} className='tile'>{props.tile}</button>
        </div>
    )}

export default Tile

