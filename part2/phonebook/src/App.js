import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const inputChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {name: newName}
    if (!(isDuplicate(person))) {
      setPersons(persons.concat(person))
      setNewName('')
    }
  }

  const isDuplicate = ( { name } ) => {
    const names = persons.map(person => person.name)
    if (names.includes(name)) {
      alert (`${name} is already added to phonebook`)
      return true
    }
    return false
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={inputChange} />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <NamesList persons={persons}/>
    </div>
  )
}

const NamesList = ({ persons }) => {
return (
<div>
  {persons.map(person => <div key={person.name}>{person.name}</div>)}
</div>  
)
}

export default App