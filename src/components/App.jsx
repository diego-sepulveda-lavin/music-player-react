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

    const [isPlaying, setIsPlaying] = useState(false)
    const [activeSong, setActiveSong] = useState(null)

    let player = useRef()

    const setPlayer = (song, index) => {
        player.src = `https://assets.breatheco.de/apis/sound/${song}`
        console.log(isPlaying)
        setActiveSong(index)
        setIsPlaying(false)
    }

    const play = () => {
        player.play()
    }

    const pause = () => {
        player.pause()
    }

    const previousSong = () => {
        setPlayer(playlist[activeSong - 1].url, activeSong - 1)
    }

    const nextSong = () => {
        setPlayer(playlist[activeSong + 1].url, activeSong + 1)
    }




    return (
        <>
            <div id='contenedor'>
                <ul>
                    {
                        playlist.length > 0 ?
                            playlist.map((elemento, index) =>
                                <li key={index} style={activeSong === index ? { backgroundColor: "yellow", color: "black" } : { backgroundColor: "" }} onClick={() => setPlayer(elemento.url, index)}>
                                    <span id="contador">{index + 1} </span>
                                    <span id="tituloCancion">{elemento.name}</span>
                                </li>)
                            : <li>No hay canciones en tu playlist</li>
                    }
                </ul>
                <div className='reproductor'>
                    <audio ref={(t) => player = t} />
                    <button onClick={previousSong} disabled={activeSong === null || (activeSong - 1) < 0 ? true : false}><i className="fas fa-step-backward"></i></button>
                    {
                        isPlaying === false ?
                            (<button onClick={() => { setIsPlaying(true); play() }}><i className="fas fa-play"></i></button>)
                            :
                            (<button onClick={() => { setIsPlaying(false); pause() }}><i className="fas fa-pause"></i></button>)
                    }

                    <button onClick={nextSong} disabled={activeSong === null || (activeSong + 1) >= playlist.length ? true : false}><i className="fas fa-step-forward"></i></button>
                </div>
            </div>
        </>
    )
}

export default App;