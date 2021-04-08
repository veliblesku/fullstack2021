import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import PersonsList from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [showAll, setShowAll] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const removePerson = (id) => {
    const personToDelete = persons.filter(person => {
      return person.id === id
    })[0]
    //const personToDelete = personToDelete1[0]
    console.log(personToDelete, typeof(personToDelete))
    if(window.confirm("Are you sure you want to delete?")){


      personService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)),
        setMessageType("success"),
        setSuccessMessage(`deleted '${personToDelete.name}'`),
        setTimeout(()=> {
          setSuccessMessage(null)
        },5000))
        .catch(error=>{
          setMessageType("error")
          setSuccessMessage(`User '${personToDelete.name}' has already been removed`)
          setTimeout(()=> {
            setSuccessMessage(null)
          },5000)
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
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.findIndex(person => person.name === personObject.name) === -1 ) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)) 
        },
        setMessageType("success"),
        setSuccessMessage(`added '${personObject.name}'`),
        setTimeout(()=> {
          setSuccessMessage(null)
        },5000))
      
    } else {

      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(person => person.name === personObject.name)
        const changedPerson = {...personToUpdate, number: newNumber}
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          },
          setMessageType("success"),
          setSuccessMessage(`updated '${changedPerson.name}'`),
          setTimeout(()=> {
            setSuccessMessage(null)
          },5000))
          .catch(error=>{
            setMessageType("error")
            setSuccessMessage(`User '${newName}' has already been removed`)
            setTimeout(()=> {
              setSuccessMessage(null)
            },5000)
          })
      } 
    }
    setNewName('')
    setNewNumber('')
  }

  //const personsToShow = persons.filter(x => new RegExp(newFilter, 'i').test(x.name));
  const personsToShow = persons.filter(person => person.name.toString().toLowerCase()
                                      .includes(newFilter.toString().toLowerCase()))

     // : persons.filter(person => person.name.includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <Notification message={successMessage} type={messageType}/>
      <AddPersonForm addPerson={addPerson} newName={newName}
                     handleNumberChange={handleNumberChange} newNumber={newNumber}
                     handleNameChange={handleNameChange}/>
      <h2>Numbers</h2> 
      <PersonsList persons={personsToShow} newFilter={newFilter} removePerson={removePerson}/>
    </div>
  )

}

export default App