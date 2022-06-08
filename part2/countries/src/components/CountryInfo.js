import React from "react";

const CountryInfo = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital:   {country.capital[0]}</div>
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
          .map(language => {
            return <li key={language[0]}>{language[1]}</li>
          }
          )
        }  
      </ul>
    </>
  )
}

export default CountryInfo;