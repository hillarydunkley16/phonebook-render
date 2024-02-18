const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
//need to be able to add entries, delete entries & search for entries
let persons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0 
    return maxId + 1
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})
//edit this to get person based off of name 
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
        response.json(person)
    }else{
        response.status(404).end()
    }
    response.json(person)
  })

// app.get('/api/persons/:name', (request, response) => {
//     const name = request.params.name.toLowerCase()
//     const person = persons.find(person => person.name.toLowerCase() === name)
//     if (person){
//         response.json(person)
//     }else{
//         response.json(person)
//     }
// })
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        name: body.name, 
        number: body.number, 
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})
const PORT = process.env.PORT || 3001 
app.listen(PORT)
console.log(`Server running on port ${PORT}`)