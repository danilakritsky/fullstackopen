import React from "react"

import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import personService from "./services/persons"

const App = () => {
  
  const [persons, setPersons] = useState([]);

  useEffect(
    () => {
      personService
        .getAll()
        .then(initialPersons => setPersons(initialPersons))
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

  const deleteHandler = (id) => {
    const name = persons.filter(p => p.id === id)[0].name;
    if (window.confirm(`Delete ${name}?`)) {
      setPersons(persons.filter(person => person.id !== id));
      personService.deletePerson(id);
    }
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
      personService
      .addPerson(person)
      .then(newPerson => setPersons([...persons, newPerson]));
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
      <Phonebook
        persons={personsToShow}
        deleteHandler={deleteHandler}
      />
    </div>
  )
}

export default App