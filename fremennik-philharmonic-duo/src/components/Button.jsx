const Button = ({ text, handleClick, id }) => {
    return (
      <button id={id} onClick={handleClick}>{text}</button>
    )
}

export default Button