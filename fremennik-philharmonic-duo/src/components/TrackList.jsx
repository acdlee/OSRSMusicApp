import Button from "./Button"

const TrackList = ({ searchOptions, handleTrackSelection }) => {
    return (
      <div>
        {searchOptions.map((trackObject) => {
          return (
            <p key={trackObject.id}>
              {trackObject.title}
              <Button id={trackObject.title} text={`Select ${trackObject.title}`} handleClick={handleTrackSelection} />
            </p>
          )
        })}
      </div>
    )
}

export default TrackList