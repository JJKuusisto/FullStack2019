import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Find = ({text}) => {
    return(
        <div>
            <form>
                find countries <input onChange={text}/>
            </form>
        </div>
    )
}


const Country = ({name, onClick}) =>{
    return(
        <div>
            {name} <button onClick={() => onClick(name)}>show</button>
        </div>
    )
}
const Weather = ({capital}) =>{
    const [temp, setTemp] = useState(0)
    const [wind, setWind] = useState(0)
    const [icon, setIcon] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' 
    + capital + '&&APPID=ac1affd1ffd55474c5024b14669a3d03'
    useEffect(() =>{
        const fetchData = async () => {
            setIsLoading(true)
            const result = await axios(url)
            setTemp(result.data.main.temp - 273.15)
            setWind(result.data.wind.speed)
            setIcon('http://openweathermap.org/img/w/' + result.data.weather[0].icon + '.png')
            setIsLoading(false)
        }
        fetchData()        
    }, [url])


    return(
        isLoading ? (
            <div>loading...</div>
        ) : (
            <div>
                <h2>Weather in {capital}</h2>
                <h3>Temperature: {temp.toFixed(1)} Celsius</h3>
                <img src={icon} alt="icon" />
                <h4>Wind: {wind} m/s</h4>
                
            </div>
        )
    )
   
}

const DetailsOfCountry = ({country}) =>{
    const languages = country[0].languages.map(l => <li key={l.name}>{l.name}</li>)
    return (
        <div>
            <h1>{country[0].name}</h1>
            <p>capital {country[0].capital}</p>
            <p>population {country[0].population}</p>
            <h3>languages</h3>
            <ul>
                {languages}
            </ul>
            <img src={country[0].flag} width="400" alt={country[0].name}/>
        </div>
    )

}

const DetailedInfo = ({country}) =>{
    const capital = country[0].capital
    return(
        <div>
            <DetailsOfCountry country={country} />
            <Weather capital={capital} />
        </div>      
    )
}

const Countries = ({countries, onClick}) => {
    const content = countries.map(c => 
            <Country key={c.name} name={c.name} onClick={onClick}/>
        )
    if(countries.length <= 10 && countries.length > 1){
        return (
            <div>
                {content}
            </div>
            
        )
    } else if(countries.length === 1){
      return(
            <DetailedInfo country={countries} />
      )
    } else {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    
}

const App = () => {
    const[data, setData] = useState([])
    const[filter, setFilter] = useState('')

    useEffect(() =>{
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setData(response.data)
            })
    }, [])

    const details = (name) => {
        setFilter(name)
    }
    const changeText = (event) =>{
        setFilter(event.target.value)
    }

    const getCountries = () => {
        const countries = data.filter(d => d.name.toLowerCase().includes(filter.toLowerCase()))
        
        return(
            countries
        )
    }

 

    return (
        <div>
            <Find text={changeText}/>
            <Countries countries={getCountries()} onClick={details} />
        </div>
    )
}

export default App