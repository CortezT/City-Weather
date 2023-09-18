document.addEventListener('DOMContentLoaded', function () {
    // API key
    const apiKey = '2fd74d7d94bd0df98c5fc9a40f4b89c9';
    const baseUrl = 'https://api.openweathermap.org/data/2.5';

    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityEl = document.getElementById('city');
    const dateEl = document.getElementById('date');
    const weatherIconEl = document.getElementById('weather-icon');
    const temperatureEl = document.getElementById('temperature');
    const humidityEl = document.getElementById('humidity');
    const windEl = document.getElementById('wind');

    // Function to fetch current weather data
    function fetchCurrentWeather(city) {
        const apiUrl = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=imperial`; // Use 'imperial' for Fahrenheit

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                cityEl.textContent = data.name;
                dateEl.textContent = new Date(data.dt * 1000).toLocaleDateString();
                weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                temperatureEl.textContent = `${data.main.temp} °F`; // Display temperature in Fahrenheit
                humidityEl.textContent = `${data.main.humidity}%`;
                windEl.textContent = `${data.wind.speed} m/s`;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('City not found. Please try again.');
            });
    }

    // Function to fetch 5-day forecast
    function fetchFiveDayForecast(city) {
        const apiUrl = `${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=imperial`; // Use 'imperial' for Fahrenheit

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Assuming the API returns data for the next 5 days at 3-hour intervals
                const dailyData = data.list.filter((item, index) => index % 8 === 0);

                // Update the 5-day forecast on the page
                for (let i = 0; i < 5; i++) {
                    const forecast = dailyData[i];
                    const dayEl = document.querySelector(`.day-${i}`);
                    dayEl.querySelector('.card-title').textContent = new Date(forecast.dt * 1000).toLocaleDateString();
                    dayEl.querySelector('.weekDay-img').src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
                    dayEl.querySelector('.weekDay-temperature').textContent = `${forecast.main.temp_max} / ${forecast.main.temp_min} °F`; // Display temperature in Fahrenheit
                    dayEl.querySelector('.weekDay-humidity').textContent = `${forecast.main.humidity}%`;
                    dayEl.querySelector('.weekDay-windSpeed').textContent = `${forecast.wind.speed} m/s`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to fetch 5-day forecast.');
            });
    }

    // Event listener for the search button
    searchBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            fetchCurrentWeather(city);
            fetchFiveDayForecast(city);
        }
    });
});