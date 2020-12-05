import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, songs, setSongs, setCurrentSong}) => {

    useEffect(() => {
        if (isPlaying) {
            const playPromise = audioRef.current.play()
            if (playPromise !== undefined) {
                playPromise.then(audio => {
                    audioRef.current.play()
                })
            }
        }
    }, [currentSong])

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        } else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    const formatTime = (time) => Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    const skipTrackHandler = async (direction) => {
        const currentIndex = songs.findIndex(s => s.id === currentSong.id)
        let newIndex = currentIndex + direction

        if (newIndex >= songs.length) newIndex = 0
        else if (newIndex < 0) newIndex = songs.length - 1

        await setCurrentSong(songs[newIndex])
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{formatTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range"/>
                    <div className="animate-track" style={{transform: `translateX(${(songInfo.currentTime/songInfo.duration)*100}%)`}}>

                    </div>
                </div>
                <p>{formatTime(songInfo.duration || 0)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler(-1)} className="skip-back" size="2x"
                                 icon={faAngleLeft}/>
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler(1)} className="skip-forward" size="2x"
                                 icon={faAngleRight}/>
            </div>
        </div>
    )
}

export default Player;