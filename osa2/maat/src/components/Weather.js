import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [weather, setWeather] = useState(null)
    const api_key = process.env.REACT_APP_API_KEY    
    const {capital} = props
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
    useEffect(() => {
        axios
          .get(url)
          .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            setWeather(response.data)
            
          })
      },[])
    if(weather){
        return (
            <div>
                <p><b>temperature:</b>{weather.main.temp} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
                <p><b>wind:</b> {weather.wind.speed} m/s, <b>direction</b> {weather.wind.deg}</p>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

}

export default Weather