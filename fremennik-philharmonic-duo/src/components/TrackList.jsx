import Button from "./Button"

const TrackList = ({ searchOptions, addToQueue }) => {
    return (
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
    )
}

export default TrackList