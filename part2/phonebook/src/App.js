import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123467' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const newNameHandler = (event) => {
    setNewName(event.target.value)
  }

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {name: newName, number: newNumber}
    if (!(isDuplicate(person))) {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
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
          name: <input value={newName} onChange={newNameHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={newNumberHandler} />
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
  {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
</div>  
)
}

export default App