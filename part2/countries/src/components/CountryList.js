import React from "react";

const CountryList = ({ countryNames }) => { 
  return (
    <div>
      {
        countryNames
        .map(countryName =>
          <div key={countryName}>{countryName}</div>
        )
      }
    </div>
  )
}

export default CountryList;