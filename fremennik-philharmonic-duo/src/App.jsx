import { useEffect, useState } from 'react'

import './App.css'
import { musicData } from './data/data'

import Title from './components/Title'
import Intro from './components/Intro'
import Guide from './components/Guide'
import Music from './components/Music'
import TrackList from './components/TrackList'
import SearchBox from './components/SearchBox'

const App = () => {
  const [track, setTrack] = useState(musicData[0])  // default track to 'Peace and Prosperity'
  const [search, setSearch] = useState('')
  const [audioObj, setAudioObj] = useState('')

  useEffect(() => {
    setAudioObj(new Audio(track.url)
  )}, [track])

  const playTrack = () => {
    audioObj.play()
  }

  const pauseTrack = () => {
    audioObj.pause()
  }

  const handleTrackSelection = (event) => {
    audioObj.pause() // stop the current track
    const newTrack = musicData.find(trackObj => trackObj.title === event.target.id)
    setTrack(newTrack)
  }

  const handleSearch = event => setSearch(event.target.value)

  const searchOptions = search === ''
    ? musicData
    : musicData.filter(trackObject => trackObject.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Title />
      <Intro />
      <Guide />
      <Music playTrack={playTrack} pauseTrack={pauseTrack} />
      <SearchBox search={search} handleSearch={handleSearch} />
      <TrackList searchOptions={searchOptions} handleTrackSelection={handleTrackSelection} />
    </>
  )
}

export default App
