const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://hvgdunkley:${password}@phonebook.n5kisuq.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
})


const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 5){
  const inputNumber = process.argv[4]
  const inputName = process.argv[3]

  const person = new Person({
  name: inputName, 
  phoneNumber: inputNumber
})
person.save().then(result => {
  console.log(`Added ${person.name} ${person.phoneNumber} to the phonebook!`)
  mongoose.connection.close()
})
.catch(err => console.error('Error saving person', err));
}
else if (process.argv.length < 5){
  Person.find({}).then(persons => {
    console.log("phonbeook: ")
    persons.forEach(person => {
     console.log(`${person.name} ${person.phoneNumber}`)
    })
    mongoose.connection.close()
})
.catch(err => console.error('Error displaying phonebook ', err));
}



