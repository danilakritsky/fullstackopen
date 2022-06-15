import React from "react"

const Notification = ({message, style}) => {

  const defaultStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const notificationStyle = style ? {...defaultStyle, ...style} : defaultStyle

  if (message === null)
    return null
  return (
    <div
      className="notification"
      style={notificationStyle}
    >
      {message}
    </div>
  )
}

export default Notification