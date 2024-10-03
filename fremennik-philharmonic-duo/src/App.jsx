import { useEffect, useState } from 'react'

import './App.css'
import { musicData } from './data/data'

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

  const handlePlayPause = (event) => {
    const action = play ? "Pausing" : "Playing"
    console.log(action)
    setPlay(!play)
  }

  const handleNext = () => {
    // check if next is a valid action
    if (queue.length > currentSong + 1) {
      // pause the current song
      queue[currentSong].pause()
      // move to the next song
      setCurrentSong(currentSong + 1)
    }
  }

  const addToQueue = (event) => {
    const newTrack = musicData.find(trackObj => trackObj.title === event.target.id)
    setQueue(queue.concat(new Audio(newTrack.url)))
  }

  const handleSearch = event => setSearch(event.target.value)

  const searchOptions = search === ''
    ? musicData
    : musicData.filter(trackObject => trackObject.title.toLowerCase().includes(search.toLowerCase()))

  // Check if the user is allowed to play a song
  if (queue.length > 0 && currentSong < queue.length) {
    // Check if the user wants to play or pause
    play ? queue[currentSong].play() : queue[currentSong].pause()
  }

  return (
    <>
      <div>Debug: {play ? "Playing" : "Paused"}</div>
      <Title />
      <Intro />
      <Guide />
      <div>
        <Button id="play-pause-button" text={play? "Pause" : "Play"} handleClick={handlePlayPause} />
        <Button id="next-button" text="Next" handleClick={handleNext} />
      </div>
      <div>
        <label htmlFor="search">Search:</label>
        <input id='search' value={search} onChange={handleSearch}/>
      </div>
      <div>
        {searchOptions.map((trackObject) => {
          return (
            <p key={trackObject.id}>
              {trackObject.title}
              <Button id={trackObject.title} text={`Queue`} handleClick={addToQueue} />
            </p>
          )
        })}
      </div>
    </>
  )
}

export default App
