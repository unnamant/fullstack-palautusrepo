import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './Notification'

const PersonForm = ({ addNewPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input 
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
      <div>
        <button type="submit">add</button>
      </div>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map(person => 
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
        </div>
      )}
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with: <input 
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const showNotification = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      axios
        .delete(`/api/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const existingPerson = (persons.find(person => person.name === newName))
      
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
            setNewNumber('')
          })
          .catch(error => {
            console.log(error.response.data)
            if (error.response?.status === 400) {
              showNotification(
              `Information of ${updatedPerson.name} has already been removed from server`, 'error'
            )
            setPersons(persons.filter(person => person.id !== existingPerson.id))
            } else {
                showNotification(
                  error.response.data.error, 'error'
                )
              }
            })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${newName}`)
        })
        .catch(error => {
          console.log(error.response.data)
          showNotification(
            error.response?.data.error, 'error'
          )
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      /> 

    </div>
  )
}

export default App