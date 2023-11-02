const API_KEY = "a1871a7d447e53399787d4132ebd3545";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  document.getElementById("loadingSpinner").style.display = "block";

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const bodyElement = document.body;
      document.getElementById("cityName").innerText = data.name;
      document.getElementById("temperature").innerText = `${data.main.temp}°C`;
      document.getElementById("description").innerText =
        data.weather[0].description;
      document.getElementById(
        "humidity"
      ).innerText = `Humidity: ${data.main.humidity}%`;
      document.getElementById(
        "windSpeed"
      ).innerText = `Wind Speed: ${data.wind.speed} m/s`;

      const iconElement = document.getElementById("weatherIcon");
      switch (data.weather[0].main) {
        case "Clear":
          bodyElement.style.backgroundColor = "#FFD700";
          iconElement.className = "fas fa-sun";
          iconElement.style.color = "#FFA500";
          break;
        case "Clouds":
          bodyElement.style.backgroundColor = "#D3D3D3";
          iconElement.className = "fas fa-cloud";
          iconElement.style.color = "#808080";
          break;
        case "Rain":
        case "Drizzle":
          bodyElement.style.backgroundColor = "#00BFFF";
          iconElement.className = "fas fa-cloud-rain";
          iconElement.style.color = "#1E90FF";
          break;
        case "Snow":
          bodyElement.style.backgroundColor = "#F0F8FF";
          iconElement.className = "fas fa-snowflake";
          iconElement.style.color = "#B0E0E6";
          break;
        case "Thunderstorm":
          bodyElement.style.backgroundColor = "#483D8B";
          iconElement.className = "fas fa-bolt";
          iconElement.style.color = "#FFD700";
          n;
          break;
        default:
          bodyElement.style.backgroundColor = "#e9f7fa";
          iconElement.className = "fas fa-cloud";
          iconElement.style.color = "#A9A9A9";
      }

      // Display the fetched weather details
      document.querySelector(".weather-info").style.display = "block";

      // Hide spinner
      document.getElementById("loadingSpinner").style.display = "none";

      // Display the fetched weather details with transition
      const weatherInfo = document.querySelector(".weather-info");
      weatherInfo.classList.add("visible");
    })

    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again.");
    });
}
