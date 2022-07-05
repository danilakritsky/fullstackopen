const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log(`connecting to ${url}`);

mongoose
  .connect(url)
  .then(result => console.log('Connected to MongoDB'))
  .catch(error => {
    console.log(
      'Error connecting to MongoDB', error.message);
  })


  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3
    },
    number: {
      type: String,
      minLength: 8,
      validate: {
        validator: v => {return /\d{2,3}-\d+/.test(v)},
        message: props => `${props.value} is not a valid phone number!`
      }
    }
  })

  personSchema.set('toJSON', {
    transform: (document, returnedPerson) => {
      returnedPerson.id = returnedPerson._id.toString();
      delete returnedPerson._id;
      delete returnedPerson.__v;
    }
  })

  module.exports = mongoose.model('Person', personSchema);
