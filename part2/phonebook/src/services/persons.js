import axios from "axios"

const baseUrl = '/api/persons'

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