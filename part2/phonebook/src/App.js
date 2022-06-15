import React from "react"

import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const baseUrl = 'https://danilakritsky-fullstackopen-66rx7x9xhwg6-3001.githubpreview.dev'

  useEffect(
    () => {
      axios
        .get(`${baseUrl}/persons`)
        .then(response => {
          setPersons(response.data)
        })
      },
    [])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setNewSearchTerm] = useState('')

  const newNameHandler = (event) => {
    setNewName(event.target.value)
  }

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }
  
  const newSearchTermHandler = (event) => {
    setNewSearchTerm(event.target.value)
  }

  const personsToShow = (newSearchTerm === '')
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(newSearchTerm.toLowerCase())
      )

  const addPerson = (event) => {
    event.preventDefault()
    const person = {name: newName, number: newNumber}
    if (!(isDuplicate(person))) {
      setPersons(persons.concat(person));
      axios
      .post(`${baseUrl}/persons`, person)
      .then(response => console.log(response));
      setNewName('');
      setNewNumber('');
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
      <Filter
        newSearchTerm={newSearchTerm}
        newSearchTermHandler={newSearchTermHandler} 
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNameHandler={newNameHandler}
        newNumber={newNumber}
        newNumberHandler={newNumberHandler}
      />
      <h2>Numbers</h2>
      <Phonebook persons={personsToShow}/>
    </div>
  )
}

export default App