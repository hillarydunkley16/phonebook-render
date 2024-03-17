const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
//add in mongo functionalities to get all entries, post entries and get a specific entry
//need to be able to add entries, delete entries & search for entries
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  app.use(requestLogger)
let persons = [
  ]

//get entire phonebook 
app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
    .catch(error => next(error))
})
//get person based on id -> with mongo 
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    .catch(error => next(error))
  })


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const person = new Person({
        name: body.name, 
        phoneNumber: body.phoneNumber
    })
    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})
//figure out how to do this. 
app.put('/api/persons/:id', (request, response) => {
  const {name, phoneNumber} = request.body
  Person.findByIdAndUpdate(
    request.params.id, 
    {name, phoneNumber}, 
    { new: true, runValidators: true, context: 'query' }
    )
      .then(person => {
        response.json(person)
      })
      .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(person => {
        response.json(person)
      })
      .catch(error => next(error))
  })
const PORT = process.env.PORT || 3001 
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }else if(error.name === 'ValidationError'){
      return response.status(400).json({error: error.message})
    }
  
    next(error)
  }
  
  // this has to be the last loaded middleware, also all the routes should be registered before this!
  app.use(errorHandler)