import React, { useState, useEffect } from 'react';
import secrets from '../../../secrets.json';

const Forecast = ({ zipCode }) => {
  const apiKey = secrets['apiKey'];
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocationData = () => {
      fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${zipCode}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setLocationData(data);
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false); // Set loading to false in case of an error
        });
    };

    getLocationData();
  }, [apiKey, zipCode]);

  
  useEffect(() => {
    const getWeatherData = (cityKey) => {
      fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setWeatherData(data);
          //setLoading(false); // Set loading to false once data is fetched
        })
        .catch(error => {
          console.error('Error:', error);
          //setLoading(false); // Set loading to false in case of an error
        });
    }

    if (locationData && locationData.length > 0){
      const cityKey = locationData[0]['ParentCity']['Key'];
      getWeatherData(cityKey);
    }
  })

  console.log(weatherData)

  return (
    <div>
      {loading ? (
        <h1>...</h1> // put a component here to show loading
      ) : locationData && locationData.length > 0 ? (
        <>
        <h1>5 Day forecast for {locationData[0]['LocalizedName']}, {locationData[0]['AdministrativeArea']['ID']}</h1>

        </>
      ) : (
        <h1>Invalid ZIP code</h1>
      )}
    </div>
  );
};

export default Forecast;