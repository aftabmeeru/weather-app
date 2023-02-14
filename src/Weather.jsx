import React, { useEffect, useState } from 'react';
import './Styles/app.scss';
import './Styles/weather.scss';

const Weather = () => {

    const [search, setSearch] = useState();
    const [data, setData] = useState({})

    const getWeather = async (search) => {

        try {

            const url = `https://api.weatherapi.com/v1/current.json?key=0d6a08a4b36e428e89c31348220912&q=${search}`;

            const result = await fetch(url);
            const resp = await result.json();
            console.log(resp);

            const date = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const newDate = resp.location.localtime;
            const exactDate = newDate.split(" ")[0];
            const exactTime = newDate.split(" ")[1];
            const newDay = new Date(exactDate).getDay();
            const exactDay = date[newDay];

            setData({
                city: resp.location.name,
                temp: resp.current.temp_c,
                time: `${exactDate} ${exactDay} ${exactTime}`,
                emoji: resp.current.condition.icon,
                text: resp.current.condition.text
            })

        }

        catch (error) {
            alert("No Location Found");
        }

    }

    useEffect(() => {
        getWeather("Delhi");
    }, [])

    const handleInput = (e) => {
        setSearch(e.target.value);
    }

    const getInputValue = () => {
        getWeather(search);
    }
    
  return (
    <>
        <div className="container">
            <div className="weather-container">
            <div className="searchField">
                <input onChange={ handleInput } value={ search || "" } type="search" placeholder='Enter Location' />
                <button onClick={ getInputValue }>Search</button>
            </div>
            <div className="weather">
                <div id='temp' className="weather1">{data.temp}°</div>
                <div className="weather2">
                    <p id="city">{data.city}</p>
                    <span id="time">{data.time}</span>
                </div>
                <div className="weather3">
                    <p><img id='img' src={data.emoji} alt="emoji" /></p>
                    <span id="con">{data.text}</span>
                </div>
            </div> 
            </div>
        </div>
    </>
  );

}

export default Weather;