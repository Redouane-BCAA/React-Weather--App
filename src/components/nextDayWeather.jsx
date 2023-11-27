import React from 'react'
import clear from '../assets/images/01d.gif'
import partyCloud from '../assets/images/02d.gif'
import cloud from '../assets/images/03d.png'
import cloudPlus from '../assets/images/04d.png'
import lightRain from '../assets/images/09d.gif'
import rain from '../assets/images/10d.gif'
import thunder from '../assets/images/11d.gif'
import snow from '../assets/images/13d.gif'
import mist from '../assets/images/50d.png'


export default function nextDayWeather({forecast}) {

  const weatherIcons = {
    '01d': clear,
    '02d': partyCloud,
    '03d': cloud,
    '04d': cloudPlus,
    '09d': lightRain,
    '10d': rain,
    '11d': thunder,
    '13d': snow,
    '50d': mist,
  };

  const iconCode = forecast.weather[0].icon;
  const iconSource = weatherIcons[iconCode];

  // Utilisation de toFixed(0) pour arrondir la température à l'entier le plus proche
  const formattedTemperature = forecast.main.temp.toFixed(0);

  return (
    <div className='next-days-card'>
      <img src={iconSource} alt="Weather Icon" />
      <p> {forecast.weather[0].main}</p>
      <p className='temp'> {formattedTemperature}°</p>
        
    </div>
  )
}
