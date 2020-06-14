let cityName = document.querySelector("#cityName");
let city = document.querySelector("#city");
let date = document.querySelector("#date");
let errorMessage = document.querySelector("#errorMessage");
let displayContainer = document.querySelector("#displayContainer");

let temperature = document.querySelector("#temperature");
let weatherIcon = document.querySelector("#weatherIcon");
let weatherType = document.querySelector("#weatherType");

let max = document.querySelector("#max");
let min = document.querySelector("#min");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");

let weatherData;
let api = {
  endPoint: "http://api.openweathermap.org/data/2.5/weather",
  imgUrl: "http://openweathermap.org/img/wn",
  key: "70b71e502eb9ec08db53139964c647fa",
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    getWeather();
  }
});

async function getWeather() {
  weatherData = fetch(
    `${api.endPoint}?q=${cityName.value}&units=metric&appid=70b71e502eb9ec08db53139964c647fa`
  )
    .then((response) => response.json())
    .then((weatherData) => {
      if (weatherData.cod == 200) {
        displayContainer.style.display = "block";

        city.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
        let getDate = new Date();
        date.innerHTML = getDate.toDateString();
        temperature.innerHTML = `${Math.floor(weatherData.main.temp)}°C`;

        weatherIcon.src = `${api.imgUrl}/${weatherData.weather[0].icon}.png`;
        weatherIcon.style.display = "block";
        weatherType.innerHTML = weatherData.weather[0].main;

        max.innerHTML = `max: ${Math.floor(weatherData.main.temp_max)}°C`;
        min.innerHTML = `min: ${Math.floor(weatherData.main.temp_min)}°C`;
        wind.innerHTML = `wind: ${weatherData.wind.speed}`;
        humidity.innerHTML = `humidity: ${weatherData.main.humidity}`;

        errorMessage.innerHTML = "";
      } else if (weatherData.cod >= 400) {
        errorMessage.innerHTML = weatherData.message;
      }
    });
}
