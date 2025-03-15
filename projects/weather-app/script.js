async function getWeather() {
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const city = document.getElementById("city").value;
    
    if (!city) {
        document.getElementById("weather-info").innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weather-info").innerHTML = "<p>City not found. Please try again.</p>";
            return;
        }

        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        document.getElementById("weather-info").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>Weather:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        `;
    } catch (error) {
        document.getElementById("weather-info").innerHTML = "<p>Error fetching data. Please try again later.</p>";
        console.error("Error fetching weather data:", error);
    }
}
