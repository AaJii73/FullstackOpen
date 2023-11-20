import { useState } from 'react'

const Form = ({fields, eventHandlers}) => {
  return (
    <form onSubmit={eventHandlers.addName}>
      <div>
        name: <input value={fields.name} onChange={eventHandlers.changeName} />
      </div>
      <div>
        number: <input value={fields.number} onChange={eventHandlers.changeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({searchString, handleSearchStringChange}) => {
  return (
    <div>
    filter shown with <input value={searchString} onChange={handleSearchStringChange} /> 
    </div>
  )
}

const Phonebook = ({persons, searchString}) => {
  return (
    <>
    {persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase())).map( person => <div key={person.name}> {person.name} {person.number} </div>)}
    </>
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
  const [searchString, setSearchString] = useState('')

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value)
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name == newName)) {
    alert(`${newName} is already added to phonebook`)

    

    }else{
      const nameObject = {
        name: newName,
        number: newNumber
      }
    
      setPersons([...persons, nameObject])
      setNewName('')
      setNewNumber('')
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchString={searchString} handleSearchStringChange={handleSearchStringChange} />
      <h2>add a new</h2>
      <Form 
        fields={{name: newName, number: newNumber}} 
        eventHandlers={{changeName: handleNewNameChange, changeNumber: handleNewNumberChange, addName: addName}}
        />
      <h2>Numbers</h2>
      <Phonebook persons={persons} searchString={searchString} />
    </div>
  )
}

export default App