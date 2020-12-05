import React from 'react';

const LibrarySong = ({song, songs, setCurrentSong, audioRef, isPlaying, setSongs, currentSong}) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song)
        const newSongs = songs.map(s => {
            if(s.id === song.id) {
                return {
                    ...s,
                    active: true,
                }
            } else {
                return {
                    ...s,
                    active: false
                }
            }
        })
        setSongs(newSongs)
        if (isPlaying) {
            const playPromise = audioRef.current.play()
            if (playPromise !== undefined) {
                playPromise.then( audio => {
                    audioRef.current.play()
                })
            }
        }
    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.id === currentSong.id ? 'selected' : ''}`}>
            <img src={song.cover} alt={song.name}/>
            <div className="song-info">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;