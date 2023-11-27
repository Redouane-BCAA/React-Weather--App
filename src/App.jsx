import React, { useState } from 'react';
import './assets/style/App.css';
import CurrentWeatherCard from './components/currentWeatherCard';
import NextDayWeatherCard from './components/nextDayWeather';
import logo from './assets/images/logo.png';

function App() {
  const api = {
    url: "https://api.openweathermap.org/data/2.5/",
    key: "f14e7a96eeaceab5cae2973a108c1735",
  };
  const [search, setSearch] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [nextDayForecast, setNextDayForecast] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchsubmit = async (e) => {
    e.preventDefault()
    // Vérifier si le champ de recherche est vide
    if (!search.trim()) {
      setErrorMessage("Veuillez remplir le champ de recherche.");
      return;
    }

    // Réinitialiser le message d'erreur
    setErrorMessage("");

    // appel api openweather 
    await fetch(`${api.url}weather?q=${search}&units=metric&lang=fr&appid=${api.key}`)
      .then(response => response.json())
      .then((response) => {
        if (response.cod === "404") {
          // Si la ville n'est pas trouvée, on affiche un message d'erreur
          setErrorMessage("Ville non trouvée. Veuillez vérifier le nom de la ville.");
        } else {
          // Sinon, on mets à jour les données
          console.log(response);
          setCurrentWeather(response);
        }
      });

    // appel api pour les prévisions des jours suivants
    await fetch(`${api.url}forecast?q=${search}&units=metric&appid=${api.key}`)
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        setNextDayForecast(response.list);
      });
  };

  // Fonction pour filtrer les prévisions pour une heure spécifique (9h du matin)
  const filterNextDayForecast = () => {
    // on vérifie d'abord si nextDayForecast est défini
    if (!nextDayForecast) {
      return [];
    }

    return nextDayForecast.filter((forecast) => {
      // Récupérez seulement les prévisions pour 9h du matin
      return forecast.dt_txt.includes("09:00:00");
    });
  };

  return (
    <div className='weather-container'>
      <h1 className='app-title'>
        Weather App <img className='logo-img' src={logo} alt="logo de l'application" />
      </h1>
      <form onSubmit={searchsubmit} className="search-bar">
        <input
          type="text"
          required="required"
          placeholder='Enter city name...'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit'> <i className="ri-search-line"></i>
        </button>
      </form>

      {/* Affichage du message d'erreur */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Affichage des résultats du temps actuel*/}
      {currentWeather.main && <CurrentWeatherCard weather={currentWeather} />}

      {/* Affichage des prévisions pour les jours suivants à 9h du matin */}
      {filterNextDayForecast().length > 0 && (
        <div className='next-days-section'>
          <h3 className='next-days-title'>Forecast for the next 5 days</h3>
          <div className='next-card-container'>
            {filterNextDayForecast().map((forecast, index) => (
              <NextDayWeatherCard key={index} forecast={forecast} />
            ))}
          </div>
        </div>
      )}
    <p>Icons by <a target='blank' href="https://icons8.com/license">Icons8</a></p>
    </div>
  );
}

export default App;
