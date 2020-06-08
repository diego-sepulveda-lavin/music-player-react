import React, { useState, useRef } from 'react';

const App = () => {

    const [playlist, setPlaylist] = useState(
        [
            { "id": 1, "category": "game", "name": "Mario Castle", "url": "files/mario/songs/castle.mp3" },
            { "id": 2, "category": "game", "name": "Mario Star", "url": "files/mario/songs/hurry-starman.mp3" },
            { "id": 3, "category": "game", "name": "Mario Overworld", "url": "files/mario/songs/overworld.mp3" },
            { "id": 4, "category": "game", "name": "Mario Stage 1", "url": "files/mario/songs/stage1.mp3" },
            { "id": 5, "category": "game", "name": "Mario Stage 2", "url": "files/mario/songs/stage2.mp3" },
            { "id": 6, "category": "game", "name": "Mario Star", "url": "files/mario/songs/starman.mp3" },
        ])

    let player = useRef(null)



    const play = () =>{
        player.play()
    }

    const pause = () =>{
        player.pause()
    }



    return (
        <>
            <div id='contenedor'>
                <ul>
                    {   
                        playlist.length > 0 ?
                        playlist.map((elemento, index) =>
                            <li key={index}>
                                <span id="contador">{elemento.id} </span>
                                <span id="tituloCancion">{elemento.name}</span>
                                <audio ref={(t) => player = t}>
                                    <source src={`https://assets.breatheco.de/apis/sound/${elemento.url}`} type="audio/mpeg" />
                                </audio>
                            </li>)
                        : <li>No hay canciones en tu playlist</li>
                    }
                </ul>
                <div className='reproductor'>
                    <button>Previous</button>
                    <button onClick={play}>Play</button>
                    <button onClick={pause}>Pause</button>
                    <button>Next</button>
                </div>
            </div>
        </>
    )
}

export default App;