import axios from 'axios'
import React from 'react'

import { useState, useEffect } from 'react'

import SearchBar from './components/SearchBar'
import CountryInfo from './components/CountryInfo'
import CountryList from './components/CountryList'

const App = () => {

  const [ allCountries, setAllCountries ] = useState([])
  const [ countrySearchResult, setCountrySearchResult ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ dataLoaded, setDataLoaded ] = useState(false)

  useEffect(
    () => {
      axios.get('https://restcountries.com/v3.1/all')
      .then(
        response => {
          setAllCountries(response.data);
            // response.data.map(country => country.name.common)
          setDataLoaded(true);
        })
    },
    []
  )
  
  const newSearchTerm = (event) => {
    setSearchTerm(event.target.value)
    setCountrySearchResult(
      allCountries
      .filter(country =>
        country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
      )
    )
  }
  
  return (
    <div>
      { dataLoaded &&
        <SearchBar
          searchTerm={searchTerm}
          onChangeHandler={newSearchTerm}
        />
      }
      {
        searchTerm &&
          <SearchResult
            countries={countrySearchResult}
          />
      }
      
    </div>
  )
}


const SearchResult = ({ countries }) => {
  
  if (countries.length === 0)
    return <div>Country not found.</div>;
  
  if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>;
  
  if (countries.length  === 1)
      return (
        <CountryInfo
          country={countries[0]}
        />
      )
  
  return (
    <CountryList
      countryNames={countries.map(country => country.name.common)}
    />)
}



export default App;
