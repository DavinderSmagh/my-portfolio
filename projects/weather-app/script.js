async function getWeather() {
    const apiKey = "33f3504b1647422b9e571038251503"; // Your WeatherAPI.com key
    const city = document.getElementById("city").value.trim();
    const weatherInfo = document.getElementById("weather-info");

    // Clear previous results
    weatherInfo.innerHTML = "";

    if (!city) {
        weatherInfo.innerHTML = "<p class='error'>Please enter a city name.</p>";
        return;
    }

    // Dynamically insert city in API URL
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    // Show loading message
    weatherInfo.innerHTML = "<p class='loading'>Fetching weather data...</p>";

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Handle errors (invalid API key, city not found, etc.)
        if (data.error) {
            weatherInfo.innerHTML = `<p class='error'>${data.error.message}</p>`;
            return;
        }

        // Extract relevant data
        const { location, current } = data;
        const weatherDescription = current.condition.text;
        const temperature = current.temp_c;
        const humidity = current.humidity;
        const windSpeed = current.wind_kph;

        // Display results
        weatherInfo.innerHTML = `
            <div class="weather-card">
                <h2>${location.name}, ${location.country}</h2>
                <p><strong>Weather:</strong> ${weatherDescription}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
            </div>
        `;
    } catch (error) {
        weatherInfo.innerHTML = "<p class='error'>Error fetching data. Please try again later.</p>";
        console.error("Error fetching weather data:", error);
    }
}
