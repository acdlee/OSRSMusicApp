import Button from './Button'

const Music = ({ maxImage, audioRef, queue, currentSong, handleEnded, setTime, maxTime, time, handleTimeChange,
  handlePrevious, handlePlayPause, play, handleNext, volValue, handleVolumeChange
 }) => {
    return (
      <figure>
        <figcaption>{queue.length > currentSong ? queue[currentSong].title : "Listen to a song!"}</figcaption>
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
        <Button id={'previous'} handleClick={handlePrevious} text="Previous"/>
        <Button id={'playpause'} handleClick={handlePlayPause} text={play ? "Pause" : "Play"} />
        <Button id={'next'} handleClick={handleNext} text="Next" />
        <input 
          type="range" 
          min={0} 
          max={10} 
          value={volValue} 
          onChange={handleVolumeChange}
        />
      </figure>
    )
}

export default Music