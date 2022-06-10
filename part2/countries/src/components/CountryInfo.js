import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


const CountryInfo = ({ country }) => {
  
  const [ weatherData, setWeatherData ] = useState([])
  const [ weatherDataloaded, setWeatherDataLoaded ] = useState(false)

  useEffect(
    () => {
      axios.get(
        `https://api.openweathermap.org/data/2.5` +
        `/weather?q=${country.capital[0]}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .then(response => {
        setWeatherData(response.data);
        setWeatherDataLoaded(true);
      })
    },
    []
  )

  return (
    weatherDataloaded &&
    <>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital[0]}</div>
      <div>area: {country.area}</div>
      <p>
        <img
          alt={`The flag of ${country.name.common}`}
          src={country.flags.png}
        />
      </p>
      <h2>languages:</h2>
      <ul>
        {
          Object.entries(country.languages)
          .map(
            language => {
              return <li key={language[0]}>{language[1]}</li>
            }
          )
        }  
      </ul>
      <h2>Weather in {country.capital[0]}</h2>
      <div>temperature: {weatherData.main.temp} Celsius</div>
      <img
        alt={
          `Current weather icon for ${country.capital[0]}` + 
          `- ${weatherData.weather[0].description}`
        }
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      >
      </img>
      <div>wind: {weatherData.wind.speed} m/s</div>
    </>
  )
}

export default CountryInfo;