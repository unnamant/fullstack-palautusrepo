import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      
      <img 
        src={country.flags.png} 
        alt={`flag of ${country.name.common}`}
        width="150"
      />
    </div>
  )
}

const Countries = ({ countries, setSearch }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries. length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <div>
      {countries.map(country => (
        <div key={country. name.common}>
          {country.name.common} 
          <button onClick={() => setSearch(country.name.common)}>
            show
          </button>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow = countries.filter(country =>
    country.name.common. toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div>
        Find countries: <input value={search} onChange={handleSearchChange} />
      </div>
      <Countries countries={countriesToShow} setSearch={setSearch} />
    </div>
  )
}

export default App