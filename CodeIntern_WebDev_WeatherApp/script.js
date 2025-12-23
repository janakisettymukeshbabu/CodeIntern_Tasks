const input = document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");
const error = document.getElementById("error");
const card = document.getElementById("weather");

const cityEl = document.getElementById("city");
const conditionEl = document.getElementById("condition");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

const API_KEY = "21b4efd74b3d8f2c21a53d204f7d2e7a";

btn.onclick = fetchWeather;
input.addEventListener("keydown", e => {
  if (e.key === "Enter") fetchWeather();
});

async function fetchWeather() {
  const city = input.value.trim();
  if (!city) return;

  error.textContent = "";
  card.classList.add("hidden");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    cityEl.textContent = data.name;
    conditionEl.textContent = data.weather[0].description;
    tempEl.textContent = `${data.main.temp} °C`;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} m/s`;

    card.classList.remove("hidden");

  } catch {
    error.textContent = "Invalid city name. Please try again.";
  }
}
