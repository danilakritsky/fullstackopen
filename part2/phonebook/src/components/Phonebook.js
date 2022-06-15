import React from "react"

const Phonebook = ({ persons, deleteHandler }) => {
    return (
      <div>
        {
          persons.map(person =>
              <div key={person.id}>
                {person.name} {person.number}
                <button key={person.id} 
                  onClick={() => deleteHandler(person.id)}
                >
                  delete
                </button>
              </div>
           )
        }
      </div>  
    )
}

export default Phonebook