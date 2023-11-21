import { useState, useEffect } from 'react'
import personsService from './services/persons'


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

const Phonebook = ({persons, setPersons, searchString, deleteButtonHandler}) => {
  return (
    <>
    {
    persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))
      .map( person => 
        <div key={person.name}>{person.name} {person.number} <button onClick={() => deleteButtonHandler(person.id)} >delete</button>
        </div>
        )
    }
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    personsService.getAll()
    .then(response => {
      setPersons(response)
    })    
  }, [])

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

      personsService.create(nameObject)
      .then(response => {

        const personsArray = [...persons, response];
        setPersons(personsArray)
        setNewName('')
        setNewNumber('')
      })
    
    }
  }

  const deleteButtonHandler = (id) => {
    if (window.confirm( `delete ${persons.find(person => person.id == id).name} ?`)){
      personsService.deleteID(id)
      .then(response=> {
        setPersons(persons.filter(person => person.id != id))
      })
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
      <Phonebook persons={persons} searchString={searchString} deleteButtonHandler={deleteButtonHandler} />
    </div>
  )
}

export default App