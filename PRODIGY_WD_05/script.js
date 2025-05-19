const apiKey = "284c9317fb12c4c74fb2b6b979eecf2b";

// Famous cities with flags
const famousCities = [
  { name: "Amsterdam", flag: "🇳🇱" },
  { name: "Bangkok", flag: "🇹🇭" },
  { name: "Barcelona", flag: "🇪🇸" },
  { name: "Beijing", flag: "🇨🇳" },
  { name: "Berlin", flag: "🇩🇪" },
  { name: "Buenos Aires", flag: "🇦🇷" },
  { name: "Cape Town", flag: "🇿🇦" },
  { name: "Cairo", flag: "🇪🇬" },
  { name: "Chicago", flag: "🇺🇸" },
  { name: "Delhi", flag: "🇮🇳" },
  { name: "Dubai", flag: "🇦🇪" },
  { name: "Hong Kong", flag: "🇭🇰" },
  { name: "Istanbul", flag: "🇹🇷" },
  { name: "Jakarta", flag: "🇮🇩" },
  { name: "Kuala Lumpur", flag: "🇲🇾" },
  { name: "Lisbon", flag: "🇵🇹" },
  { name: "London", flag: "🇬🇧" },
  { name: "Los Angeles", flag: "🇺🇸" },
  { name: "Madrid", flag: "🇪🇸" },
  { name: "Melbourne", flag: "🇦🇺" },
  { name: "Moscow", flag: "🇷🇺" },
  { name: "Mumbai", flag: "🇮🇳" },
  { name: "New York", flag: "🇺🇸" },
  { name: "Paris", flag: "🇫🇷" },
  { name: "Prague", flag: "🇨🇿" },
  { name: "Rome", flag: "🇮🇹" },
  { name: "San Francisco", flag: "🇺🇸" },
  { name: "Seoul", flag: "🇰🇷" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Stockholm", flag: "🇸🇪" },
  { name: "Sydney", flag: "🇦🇺" },
  { name: "Tokyo", flag: "🇯🇵" },
  { name: "Toronto", flag: "🇨🇦" },
  { name: "Vienna", flag: "🇦🇹" },
  { name: "Warsaw", flag: "🇵🇱" }
];

// Sort and populate dropdown
famousCities.sort((a, b) => a.name.localeCompare(b.name));

window.onload = () => {
  const citySelect = document.getElementById("city-select");
  famousCities.forEach(city => {
    const option = document.createElement("option");
    option.value = city.name;
    option.textContent = `${city.flag} ${city.name}`;
    citySelect.appendChild(option);
  });
};

// Auto-fill input from dropdown
function setCityFromDropdown() {
  const dropdown = document.getElementById("city-select");
  const input = document.getElementById("city-input");
  input.value = dropdown.value;
}

// Weather emoji mapper
function getWeatherEmoji(description) {
  const desc = description.toLowerCase();
  if (desc.includes("clear")) return "☀️";
  if (desc.includes("cloud")) return "☁️";
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("drizzle")) return "🌦️";
  if (desc.includes("thunderstorm")) return "⛈️";
  if (desc.includes("snow")) return "❄️";
  if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze")) return "🌫️";
  return "🌡️";
}

// Fetch and display weather
function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  if (!city) {
    alert("Please enter or select a city.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const weatherDesc = data.weather[0].description;
      const weatherEmoji = getWeatherEmoji(weatherDesc);

      document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country} ${weatherEmoji}`;
      document.getElementById("description").textContent = weatherDesc;
      document.getElementById("temperature").textContent = `${data.main.temp} °C`;
      document.getElementById("humidity").textContent = `${data.main.humidity} %`;
      document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;

      const rainData = data.rain ? `${data.rain["1h"] || data.rain["3h"]} mm` : "No rain";
      document.getElementById("rain").textContent = rainData;

      document.getElementById("weather-info").classList.remove("hidden");
    })
    .catch(error => {
      alert("❌ Error fetching weather: " + error.message);
    });
}
