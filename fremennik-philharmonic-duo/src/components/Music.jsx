import Button from './Button'

const Music = ({ play, handlePlayPause, handleNext }) => {
    return (
      <div>
        <Button id="play-pause-button" text={play? "Pause" : "Play"} handleClick={handlePlayPause} />
        <Button id="next-button" text="Next" handleClick={handleNext} />
      </div>
    )
}

export default Music