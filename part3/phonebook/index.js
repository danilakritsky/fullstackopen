const express = require("express")

const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors())

const morgan = require("morgan")
morgan.token(
  'postBody',
  (req, res) => {
    if (req.method === 'POST')
      return JSON.stringify(req.body)
  }
)
app.use(
  morgan(
    (tokens, req, res) => {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.postBody(req, res)
      ].join(' ')
    }
  )
)

let persons  = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


app.get(
  '/api/persons',
  (request, response) => response.json(persons)
)

app.get(
  '/info',
  (request, response) => {
    const requestTime = Date()
    const peopleCount = persons.length;
    response.send(
      `
        <p>Phonebook has info for
          ${peopleCount} ${(peopleCount === 1) ? 'person' : 'people'}.</p>
        <p>${requestTime}</p>
      `
    )
  }
)

app.get(
  '/api/persons/:id',
  (request, response) => {
    const person = persons.find(
      person => person.id === Number(request.params.id)
    )

    if (!person) response.status(404).end()

    response.json(person)
  }
)

app.delete(
  '/api/persons/:id',
  (request, response) => {
    persons = persons.filter(person => person.id !== Number(request.params.id))
    response.status(204).end()
  }
)

app.post(
  '/api/persons',
  (request, response) => {

    if (!request.body.name)
      return response.status(400).json({"error": "Missing name."})
    
    if (!request.body.number)
      return response.status(400).json({"error": "Missing number."})
    
    if (persons.map(person => person.name).includes(request.body.name))
      return response.status(400).json({"error": "Name must be unique."})

    const newPerson = {
      "id": Math.floor(Math.random() * 100000),
      "name": request.body.name,
      "number": request.body.number
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
  }
)

const PORT = process.env.PORT || 3001

app.listen(
  PORT,
  () => console.log(`App is listening on port ${PORT}.`)
)