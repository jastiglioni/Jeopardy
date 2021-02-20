import useSound from 'use-sound'
import './Play.css'
import soundUrl from './fur.mp3'

const Play = (props) => {
    
    const [play] = useSound(soundUrl, {
        sprite: {
            ewf: [0, 9700],
            drake: [10525, 13000]
        },
        volume: 0.35
    })

     return (props.audio !== false) ? (
        <button style={{background: `#0309B8`, border:`none`}} onClick={() => play({id:props.audio})}> 
            <span style={{fontSize: `100px`, background:`#0309B8`}} role="img" aria-label="play">▶️</span>
        </button>
     ) : ''
}

export default Play