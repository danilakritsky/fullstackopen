import React from "react"

const Filter = ({ newSearchTerm, newSearchTermHandler }) => {
    return (
      <div>
        filter shown with
        <input value={newSearchTerm} onChange={newSearchTermHandler}/>
      </div>
    )
}

export default Filter  