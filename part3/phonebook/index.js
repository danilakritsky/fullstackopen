const express = require("express")

const app = express()
app.use(express.static('build'))
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


require('dotenv').config();
const Person = require("./models/person");
const person = require("./models/person")


app.get(
  '/api/persons',
  (request, response) => {
    Person.find({}).then(persons => response.json(persons));
  }
)

app.get(
  '/info',
  (request, response) => {
    const requestTime = Date()
    Person.find({}).then(
      persons => {
        let peopleCount = persons.length;
        response.send(
          `
            <p>Phonebook has info for
              ${peopleCount} ${(peopleCount === 1) ? 'person' : 'people'}.</p>
            <p>${requestTime}</p>
          `
        )
      }
    )
  }
)

app.get(
  '/api/persons/:id',
  (request, response, next) => {
    Person
      .findById(request.params.id)
      .then(foundPerson => response.json(foundPerson))
      .catch(error => next(error))
  }
)

app.delete(
  '/api/persons/:id',
  (request, response, next) => {
    Person
      .findByIdAndRemove(request.params.id)
      .then(result => response.status(204).end())
      .catch(error => next(error));
  }
)

app.post(
  '/api/persons',
  (request, response) => {
    let {name, number} = request.body;

    if (!name)
      return response.status(400).json({"error": "Missing name."})
    
    if (!number)
      return response.status(400).json({"error": "Missing number."})
  
    const newPerson =  new Person({
      "name": name,
      "number": number
    })

    newPerson.save().then(savedPerson => response.json(savedPerson));

  }
)

app.put(
  '/api/persons/:id',
  (request, response) => {
    let { name, number } = request.body;
    Person
     .findByIdAndUpdate(request.params.id, { name, number })
     .then(updatedPerson => response.json(updatedPerson))
     .catch(error => next(error))
  }
)

const invalidIdErrorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    response.status(404).send({ error: 'malformatted id' });
  }

  next(error)
}
app.use(invalidIdErrorHandler)


const PORT = process.env.PORT || 3001

app.listen(
  PORT,
  () => console.log(`App is listening on port ${PORT}.`)
)