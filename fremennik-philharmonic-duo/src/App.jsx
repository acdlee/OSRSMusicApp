import { useEffect, useRef, useState } from 'react'

import './App.css'
import { musicData } from './data/dataTrue'

import maxImage from './assets/maxing.png'

import Title from './components/Title'
import Intro from './components/Intro'
import Guide from './components/Guide'
import Music from './components/Music'
import Button from './components/Button'
import TrackList from './components/TrackList'
import SearchBox from './components/SearchBox'

const App = () => {
  const [search, setSearch] = useState('')
  const [currentSong, setCurrentSong] = useState(0)
  const [queue, setQueue] = useState([])
  const [play, setPlay] = useState(false)
  const [volValue, setVolValue] = useState(5)
  const [time, setTime] = useState(0)
  const [maxTime, setMaxTime] = useState(100)

  const audioRef = useRef(null)

  const addToQueue = (event) => {
    // find the associated track object
    const newTrack = musicData.find(trackObj => trackObj.title === event.target.id)
    // add track to queue
    setQueue(queue.concat(newTrack))
  }

  const handleEnded = (event) => {
    // Since a song has ended, move the currentSong (queue pointer)
    setCurrentSong(currentSong + 1)
    // And flip play/pause button
    setPlay(!play)
  }

  const handlePlayPause = () => {
    if (audioRef.current.src !== '') {  // Check if the audio element has a song to play
      // Next line is for debugging
      // audioRef.current.currentTime = audioRef.current.duration - 20.0
      // set max time for range input element
      setMaxTime(audioRef.current.duration)
      // play or pause
      play ? audioRef.current.pause() : audioRef.current.play()
      setPlay(!play)
    }
  }

  const handlePrevious = () => {
    // Decrement currentSong (queue pointer) to move to the previous song
    if (currentSong - 1 >= 0) {
      // stop curent song
      audioRef.current.pause()
      // Set play to false
      setPlay(false)
      // move pointer
      setCurrentSong(currentSong - 1)
    }
  }

  const handleNext = () => {
    // increment currentSong (queue pointer) to move to the next song
    if (currentSong + 1 < queue.length) {
      // stop current song
      audioRef.current.pause()
      // Set play to false
      setPlay(false)
      // move pointer
      setCurrentSong(currentSong + 1)
    }
  }

  const handleVolumeChange = (event) => {
    audioRef.current.volume = event.target.value / 10
    setVolValue(event.target.value)
  }

  const handleTimeChange = (event) => {
    audioRef.current.currentTime = event.target.value
  }

  const handleSearch = event => setSearch(event.target.value)

  const searchOptions = search === ''
    ? musicData
    : musicData.filter(trackObject => trackObject.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div>Debug: {play ? "Playing" : "Paused"}</div>
      <div>Debug: {queue.map(s => s.title)}</div>
      <div>Debug: {time}</div>
      <Title />
      {/* <Intro /> */}
      {/* <Guide /> */}
      <SearchBox search={search} handleSearch={handleSearch} />
      <TrackList searchOptions={searchOptions} addToQueue={addToQueue} />

      <figure>
        <figcaption>Listen to a song!</figcaption>
        <img src={maxImage} style={{width: '500px', display: 'block'}} alt="A picture of my character on Max's Island" />
        <audio 
          ref={audioRef} 
          src={queue.length > currentSong ? queue[currentSong].url : null}
          onEnded={handleEnded}
          onTimeUpdate={(event) => setTime(audioRef.current.currentTime)}
        ></audio>
        <input 
          type="range"
          min={0}
          max={maxTime}
          value={time}
          onChange={handleTimeChange} 
        />
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handlePlayPause}>{play ? "Pause" : "Play"}</button>
        <button onClick={handleNext}>Next</button>
        <input 
          type="range" 
          min={0} 
          max={10} 
          value={volValue} 
          onChange={handleVolumeChange}
        />
      </figure>
    </>
  )
}

export default App
