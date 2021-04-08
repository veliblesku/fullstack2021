import React from 'react'
import Weather from './Weather'

const FilterCountries = (props) => {
    const {filter, countries, showCountry} = props
    const filtered = countries.filter(country => new RegExp(filter, 'i').test(country.name))
    if(filtered.length > 10){
      return(
        <p>Too many matches, specify another filter</p>
      )
    } if(filtered.length === 1) {
      const country = filtered[0]
      return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {country.languages.map(language => <li>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt='Flag' width={300} height={150}></img>
          <h2>Weather</h2>
          <Weather capital={country.capital}/>
        </div>
      )
    }
    else {
      return (
        <div>

        
          <ul>
            {filtered.map(country => 
            <li>{country.name}<button value={country.name} onClick={showCountry}>show</button></li>
            )}
          </ul>
          
        </div>
      )
    }
  }

export default FilterCountries