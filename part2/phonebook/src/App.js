import React from "react"

import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import Notification from "./components/Notification"

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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)

  const flashMessage = (message, style) => {
    setNotificationMessage(message);
    setNotificationStyle(style);
    setTimeout(
      () => {
        setNotificationMessage(null);
        setNotificationStyle(null)
      },
      5000
    );
  }

  const newNameHandler = (event) => {
    setNewName(event.target.value)
  }

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }
  
  const newSearchTermHandler = (event) => {
    setNewSearchTerm(event.target.value)
  }

  const deletePersonHandler = (id) => {
    const name = persons.filter(p => p.id === id)[0].name;
    
    if (window.confirm(`Delete ${name}`)) {
      personService
        .deletePerson(id)
        .then(result => {
          setPersons(persons.filter(person => person.id !== id))
        }
        )
        .catch(error => flashMessage(`${error.response.data.error}`, {color: 'red'}))

    }
  }

  const personsToShow = (newSearchTerm === '')
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(newSearchTerm.toLowerCase())
      )

  const submitPersonForm = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const msgStyle = {color: 'green'}

    if (!(exists(newPerson))) {
      personService
        .addPerson(newPerson)
        .then(newPerson => {
          setPersons([...persons, newPerson]);
          flashMessage(`Added ${newPerson.name}`, msgStyle);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          flashMessage(`${error.response.data.error}`, {color: 'red'})
        });
      return
    };

    const confirmationPrompt = (
      `${newPerson.name} is already added to phonebook, ` 
      + 'replace the old number with a new one?'
    )
    if (window.confirm(confirmationPrompt)) {
      const id = persons.filter(p => p.name === newPerson.name)[0].id;

      personService
        .updatePersonData(id, newPerson)
        .then(
          updatedPerson => {
            
            setPersons(
              persons.filter(p => p.id !== id).concat(updatedPerson)
            );
            flashMessage(`Updated ${updatedPerson.name}`, msgStyle);
            setNewName('');
            setNewNumber('');
          }
        )
        .catch(error => {
          flashMessage(`${error.response.data.error}`, {color: 'red'})
        });
    }     
  }

  const exists = ( { name } ) => {
    const names = persons.map(person => person.name)
    if (names.includes(name))
      return true;
    return false
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        style={notificationStyle}
      />
      <Filter
        newSearchTerm={newSearchTerm}
        newSearchTermHandler={newSearchTermHandler} 
      />
      <h2>add a new</h2>
      <PersonForm
        submitHandler={submitPersonForm}
        newName={newName}
        newNameHandler={newNameHandler}
        newNumber={newNumber}
        newNumberHandler={newNumberHandler}
      />
      <h2>Numbers</h2>
      <Phonebook
        persons={personsToShow}
        deleteHandler={deletePersonHandler}
      />
    </div>
  )
}

export default App;