import React from "react"

const PersonForm = (props) => {
    return (
      <form onSubmit={props.addPerson}>
        <div>
          name:
          <input value={props.newName} onChange={props.newNameHandler} />
        </div>
        <div>
          number:
          <input value={props.newNumber} onChange={props.newNumberHandler} />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
    )
  
}

export default PersonForm