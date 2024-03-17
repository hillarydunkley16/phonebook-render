const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();


// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.mongoUrl 
console.log("connecting to: " + url)

mongoose.set('strictQuery',false)
mongoose.connect(url, {
  user: process.env.mongoUser,
  pass: process.env.mongoPwrd,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));


const personSchema = new mongoose.Schema({
    name: {
      type: String, 
      minLength: 3, 
      required: true
    },
    phoneNumber: {
      type: String, 
      minLength: 8, 
      validate: {
        validator: function(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
      required: true,
      }
      }
  )  
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)