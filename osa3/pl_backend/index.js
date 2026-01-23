const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

morgan.token('body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": "1"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": "2"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": "3"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": "4"
    }
]

const newID = () => {
  return Math.floor(Math.random() * 1000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body. name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body. number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const nameExists = persons.find(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique, name is already in use' 
    })
  }

  const person = {
    name: body. name,
    number: body. number,
    id: newID()
  }
  persons = persons.concat(person)
  response.status(201).json(person)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()

  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})