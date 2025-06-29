import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [cityData, setCityData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputCity);
  };

  useEffect(() => {
    const fetchCityWeather = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=56315021469a45aca6063929252906&q=${city}`
        );
        setCityData(response.data);
      } catch (error) {
        console.log("Error : ", error);
        alert("Failed to fetch weather data");
      } finally {
        setIsLoading(false);
      }
    };

    if (city) {
      fetchCityWeather();
    }
  }, [city]);

  return (
    <div className="weatherContainer">
      <form action="" onSubmit={handleSubmit} className="formContainer">
        <input
          type="text"
          name="city"
          id="city"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <h3>Loading Data...</h3>}
      {cityData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h4>Temperature</h4>
            <p>{cityData.current.temp_c}'C</p>
          </div>
          <div className="weather-card">
            <h4>Humidity</h4>
            <p>{cityData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h4>Condition</h4>
            <p>{cityData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h4>Wind Speed</h4>
            <p>{cityData.current.wind_kph}kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
