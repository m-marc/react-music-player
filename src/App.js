import React, {useRef, useState} from 'react';

import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";


function App() {

    const [songs, setSongs] = useState(data)
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)
    const [songInfo, setSongInfo] = useState({currentTime: 0, duration: 0})
    const [libraryStatus, setLibraryStatus] = useState(false)

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime
        const duration = e.target.duration
        setSongInfo({...songInfo, currentTime: current, duration})
    }

    const songEndHandler = async () => {
        const currentIndex = songs.findIndex(s => s.id === currentSong.id)
        await setCurrentSong(songs[(currentIndex+1) % songs.length])
    }

    return (
        <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
            <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
            <Song currentSong={currentSong}/>
            <Player
                audioRef={audioRef}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                currentSong={currentSong}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                songs={songs}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
            />
            <Library
                libraryStatus={libraryStatus}
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
                currentSong={currentSong}
            />
            <audio
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}>
                &nbsp;
            </audio>
        </div>
    );
}

export default App;
