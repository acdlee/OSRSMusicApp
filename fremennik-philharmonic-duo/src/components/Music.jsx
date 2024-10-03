import Button from './Button'

const Music = ({ playTrack, pauseTrack }) => {
    return (
      <div>
        <Button id="playBtn" text="Play" handleClick={playTrack}/>
        <Button id="pauseBtn" text="Pause" handleClick={pauseTrack}/>
      </div>
    )
}

export default Music