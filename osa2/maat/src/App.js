import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FilterCountries from './components/FilterCountries'

const url = 'https://restcountries.eu/rest/v2/all'




const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  },[])
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const showCountry = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    //const country = countries.filter(country => new RegExp(filter, 'i').test(country.name))
    setFilter(event.target.value)
  }

  
  return (
    <div>
      find countries:
      <input value={filter} onChange={handleFilterChange}/>
      <h3>filtered countries</h3>

      <FilterCountries countries={countries} filter={filter} showCountry={showCountry}/>
    </div>
    
  )
}

export default App;
