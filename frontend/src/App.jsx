import { useState, useEffect } from 'react'
import React from 'react'
import personService from './services/persons'
import Person from './components/Person'
import './index.css'
import axios from 'axios'

const Filter = (props) => {
  return (
    <>
      <input
      type = "search"
      placeholder = "search here"
      onChange = {props.inputHandler}
      value = {props.searchInput} 
      />
    </>
  )
}
const PersonForm = (props) => {
  return(
    <>
    <form onSubmit = {props.addName}>
      <div>
        name: <input value = {props.newName} onChange = {props.handleNameChange}/>
      </div>
      <div>number: <input value = {props.newNumber} onChange = {props.handleNumChange}/></div>
      <div>
      <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='message'>
      {message}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput]= useState('')
  const [message, setMessage] = useState('')
  // const [duplicateName, setDuplicateName] = useState(false)

  // useEffect(() => {
  //   axios.get('http://localhost:3001/persons')
  //   .then((response) => {
  //     persons = response.data.map((person) => {
  //       return {
  //         name: person.name, 
  //         number: person.number, 
  //         id: person
  //       }
  //     })
  //   })
  // })
  const personsToShow = persons.filter((el) => {
    if(searchInput === ''){
      return el
    }
    else{
      return el.name.toLowerCase().includes(searchInput)
    }
  }) 
  
  
 
  
  const addName =  (event) => {
    event.preventDefault()

    // const isDuplicate = persons.some(person => person.name.toLowerCase() === newName.toLowerCase()); 
    console.log('Start of addName function');
    const exists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase()); 
    if (exists){
      console.log("name already exists"); 
      const existingName = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()); 
      console.log("the duplicate name is " , newName);
      const confirm = window.confirm(`duplicate name is ${newName}, do you want to update the phone number attached to this name?`); 
      if(confirm){
        handleSameName(existingName?.id, newNumber, existingName?.name); 
        setNewName('')
        setNewNumber('')
        return
      }
    }else{}


    const nameObject = {
      name: newName,
      number: newNumber, 
      id: persons.length + 1,
    }
    
     personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        console.log(message);
        setMessage(`Added ${newName} to the phonebook!`) 
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
     

    console.log('End of addName function');
  }
  //input handler 
  const inputHandler = (event) => {
    setSearchInput(event.target.value.toLowerCase())
  }
  //change the name of an entry
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  //change the phone number of an entry
  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  //remove an entry
  const removeName = async (id) => {
    const confirmDeletion = window.confirm(`Do you want to delete this user?`);

    if (!confirmDeletion) {
      return; // Do nothing if the user cancels the deletion
    }
    try {
      await personService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
      window.alert(`Person with id ${id} is deleted from the phonebook`);
    } catch (error) {
      window.alert('Sorry, something went wrong: ' + error.response.data.error);
    }
  }
  //handling the same name
  const handleSameName = async (id, number, name) => {
    try{
      await personService.update(id,  { number: number })
      setPersons((prevPersons) =>
      prevPersons.map((person) =>
        person.id === id ? { ...person, number: number } : person
      )
    );
    }catch(error){
      setMessage(`${name} has already been removed from the phonebook`) 
        setTimeout(() => {
          setMessage('')
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message}/>
      <h3>Filter</h3>
      <Filter 
      inputHandler = {inputHandler} 
      searchInput = {searchInput}/>
      
       {/* <Notification message={message} /> */}
      <h3>Add a name to the phonebook</h3>
      <PersonForm 
        addName = {addName} 
        newName = {newName} 
        handleNameChange = {handleNameChange} 
        newNumber = {newNumber} 
        handleNumChange = {handleNumChange}
        />
      <h2>Contacts</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person key={person.id} {...person} onClick={removeName} />
        ))}
      </ul>
      
    </div>
  )
}

export default App

