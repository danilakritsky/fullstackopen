import axios from "axios"

const baseUrl = 'https://danilakritsky-fullstackopen-66rx7x9xhwg6-3001.githubpreview.dev/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data) 
}

const addPerson = (newPerson) => {
  return (
    axios
    .post(baseUrl, newPerson)
    .then(response => response.data)
  )
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const updatePersonData = (id, updatedPerson) => {
  return (
    axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then(response => response.data)
    )
}
const personService = {
  getAll,
  addPerson,
  deletePerson,
  updatePersonData,
}

export default personService;