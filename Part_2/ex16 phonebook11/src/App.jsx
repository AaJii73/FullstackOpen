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

const Notification = ({notification}) => 
{
  const notificationStyle = {
    color: 'green',
    background: '#afc4b2',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (notification)
  {
    return (
      <div style = {notificationStyle}> {notification} </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')
  const [notificationText, setNotificationText] = useState(null)

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
     
      replaceNumber(persons.find(person => person.name == newName))

    }else{
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personsService.create(nameObject)
      .then(response => {

        setNoticfication(`Added ${newName} to phonebook`)

        const personsArray = [...persons, response];
        setPersons(personsArray)
        setNewName('')
        setNewNumber('')
      })   
    }
  }
  
  const replaceNumber = (person) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace old number with a new one?`)){

      const nameObject = {
        ...person,
        number: newNumber
      }

      personsService.update(person.id, nameObject)
      .then(response => {

        setNoticfication(`Changed the number of ${person.name} to ${newNumber}`)
        
        person.number = newNumber
        setNewName('')
        setNewNumber('')
      }) 
    }
  }

  const deleteButtonHandler = (id) => {
    const person = persons.find(p=> p.id == id)
    if (window.confirm( `delete ${person.name} ?`)){
      personsService.deleteID(id)
      .then(response=> {
        setNoticfication(`Deleted ${person.name} from phonebook`)
        setPersons(persons.filter(person => person.id != id))
      })
    }
  }
  
  const setNoticfication = (notification) => {
    setNotificationText(notification)
    const currentNotification = notification
    setTimeout(() => {
      setNotificationText(null)
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationText} />
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