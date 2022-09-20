import React, { useState } from "react";
import axios from "axios";

import searchIcon from "./assets/search.png"

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState("")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=fee9548112180af518e0bdcac706588a`

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data)
        console.log(res.data)
      })
    }
  }

  return (
    <div className="app">
      <div className="search">
      <div className="search-img">
        <input
        // value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
        type="text"
        />
        <img className="search-icon" src={searchIcon} alt="" />
      </div>
        
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name }</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{(data.main.temp - 32).toFixed() / 1.8.toFixed()} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && 
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{(data.main.feels_like - 32).toFixed() / 1.8.toFixed()} °C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.main ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div> 
        } 

      </div>
    </div>
  );
}

export default App;
