import React from 'react';
import clear from '../assets/images/01d.gif' 
import partyCloud from '../assets/images/02d.gif'
import cloud from '../assets/images/03d.png'
import cloudPlus from '../assets/images/04d.png'
import lightRain from '../assets/images/09d.gif'
import rain from '../assets/images/10d.gif'
import thunder from '../assets/images/11d.gif'
import snow from '../assets/images/13d.gif'
import mist from '../assets/images/50d.png'

export default function CurrentWeatherCard({ weather }) {
    const weatherIcons = {
        '01d': clear,
        '01n': clear,
        '02d': partyCloud,
        '02n': partyCloud,
        '03d': cloud,
        '03n': cloud,
        '04d': cloudPlus,
        '04n': cloudPlus,
        '09d': lightRain,
        '09n': lightRain,
        '10d': rain,
        '10n': rain,
        '11d': thunder,
        '11n': thunder,
        '13d': snow,
        '13n': snow,
        '50d': mist,
        '50n': mist,
      };

  const iconCode = weather.weather[0].icon;
  const iconSource = weatherIcons[iconCode];

  const formattedTemperature = weather.main.temp.toFixed(0);

  return (
    <div className="current_weather_container">
      <h2 className="current_weather_title">
        Current weather in {weather.name} <i className="ri-map-pin-2-line"></i>
      </h2>

      <img src={iconSource} alt="Weather Icon" />

      <h3>{formattedTemperature} °C</h3>

      <p>{weather.weather[0].main}</p>
      <div className="temperature-info">
        <p> Humidity: {weather.main.humidity}% </p>
        <p> Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
}
