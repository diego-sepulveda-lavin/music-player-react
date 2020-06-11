import React, { useState, useRef, useEffect } from 'react';

const App = () => {

    const [playlist, setPlaylist] = useState([])

    const [isPlaying, setIsPlaying] = useState(false)
    const [activeSong, setActiveSong] = useState(null)



    useEffect(() => {
        getSongs('https://assets.breatheco.de/apis/sound/songs')
        return () => {
        }
    }, [])

    const getSongs = (url = "", options = {}) => {
        fetch(url, options)
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                setPlaylist(data)
            })
    }


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
            <div id="contenedor-titulo">
                <h1 id="titulo">Retro Player</h1>
            </div>
            <div id='contenedor'>
                <ul id="lista">
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