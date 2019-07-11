import React, { useState } from 'react'
import Filter from './components/Filter'
import Addperson from './components/Addperson'
import Numbers from './components/Numbers'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  const filtering = () =>{
    const filtered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    console.log(filter);
    console.log(filtered);
    return (
        filtered
    )
  }

  const filterNumbers = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    filtering()
  }

  const nameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
      setNewNumber(event.target.value)
  }

const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name : newName,
        number : newNumber
    }

    if(!(persons.some(p => p.name === newName))){
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    } else {
        window.alert("Person " + newName + " is already in the list")
    }
   
}




  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filterNumbers} />
        <Addperson addPerson={addPerson} newName={newName} nameChange={nameChange}
        newNumber={newNumber} numberChange={numberChange} />
        <Numbers persons={filtering()} />
    </div>
  )

}

export default App