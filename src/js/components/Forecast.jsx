import React, { useState, useEffect } from 'react';
import secrets from '../../../secrets.json';

const Forecast = ({ zipCode }) => {
  const apiKey = secrets['apiKey'];
  const [forcastWeatherData, setForcastWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loadingLocationData, setLoadingLocationData] = useState(true);
  const [loadingForcastWeatherData, setLoadingForcastWeatherData] = useState(true);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];

    return `${dayOfWeek} ${day}/${month}`
  }


  useEffect(() => {
    const getLocationData = () => {
      fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${zipCode}`)
        .then(response => response.json())
        .then(data => {
          setLocationData(data);
          setLoadingLocationData(false); // Set loading to false once data is fetched
        })
        .catch(error => {
          console.error('Error:', error);
          setLoadingLocationData(false); // Set loading to false in case of an error
        });
    };

    getLocationData();
  }, [apiKey, zipCode]);

  
  useEffect(() => {
    const getForcastWeatherData = (cityKey) => {
      fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setForcastWeatherData(data);
          setLoadingForcastWeatherData(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoadingForcastWeatherData(false);
        });
    }

    if (locationData && locationData.length > 0){
      const cityKey = locationData[0]['ParentCity']['Key'];
      getForcastWeatherData(cityKey);
    }
  }, [locationData, apiKey]);

  console.log(forcastWeatherData)
  return (
    <div>
      {loadingLocationData ? (
      <h1>...</h1> // put a component here to show loading
    ) : locationData && locationData.length > 0 ? (
      <>
        <h1>5 Day forecast for {locationData[0]['LocalizedName']}, {locationData[0]['AdministrativeArea']['ID']}</h1>
        {loadingForcastWeatherData ? (
          <h2>...</h2>
        ) : forcastWeatherData ? (
          <>
            <h2>{forcastWeatherData['Headline']['Text']}</h2>
            {forcastWeatherData['DailyForecasts'].map((forecast, index) => (
              <div key={index} className="weather-card" style={{
                border: '1px solid black',
                backgroundColor: 'lightblue',
                padding: '10px',
              }}>
                <div>
                  <div>{formatDate(forecast['Date'])}:</div>
                  <div>Hi: {forecast['Temperature']['Maximum']['Value']}{'\u00B0'} {forecast['Temperature']['Maximum']['Unit']}</div>
                  <div>Lo: {forecast['Temperature']['Minimum']['Value']}{'\u00B0'} {forecast['Temperature']['Minimum']['Unit']}</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h2>No results found</h2>
        )}
      </>
    ) : (
      <h1>Invalid ZIP code</h1>
    )}
    </div>
  );
};

export default Forecast;