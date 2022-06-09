import React from "react";

const CountryList = ({ countryNames, countryButtonHandler }) => { 
  return (
    <div>
      {
        countryNames
        .map(countryName =>
          <div key={countryName}>
            {countryName}
            <button onClick={() => countryButtonHandler(countryName)}>
              show
            </button>
          </div>
          
        )
      }
    </div>
  )
}

export default CountryList;