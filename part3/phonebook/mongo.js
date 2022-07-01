const mongoose = require("mongoose")
const { prependOnceListener } = require("process")

if (process.argv.length != 3 & process.argv.length != 5) {
  console.log(
    `Invalid command!\n`
    +`Command usage:\n`
    +`1) list all numbers\n`
    +`node mongo.js yourPassword\n`
    +`2) add new number\n`
    +`node mongo.js yourPassword newName newNumber`)
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstackopen2022:${password}@cluster0.rsiiu.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(result => {
    console.log('connected')
    if (process.argv.length == 3) {
      Person
        .find({})
        .then(persons => {
          console.log('phonebook:')
          persons.forEach(person => console.log(person.name, person.number))
          mongoose.connection.close();
        })
    }
    else if (process.argv.length == 5) {
      newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      newPerson.save().then(
        result => {
          console.log(`added ${newPerson.name} ${newPerson.number} to phonebook`)
          mongoose.connection.close()
        }
      )
    }
  })
  .catch((err) => console.log(err))


