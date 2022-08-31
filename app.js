import WEATHER_API_KEY from "./apikey.js";

// function to round the temperature to the nearest integer
function roundToNearestNum(num) {
  return Math.floor(num + 0.5);
}

let weather = {
  // an object to store the functions & variables needed to use the API
  apiKey: WEATHER_API_KEY,
  fetchWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Imperial&appid=${this.apiKey}`
    )
      .then((res) => res.json())
      .then((data) => this.displayWeather(data))
      .catch((e) => console.log("Error!", e));
  },
  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerHTML = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerHTML = `${description}`;
    document.querySelector(
      ".temp"
    ).innerHTML = `Current Temperature: ${roundToNearestNum(temp)} °F`;
    document.querySelector(
      ".feelslike"
    ).innerHTML = `Feels like ${feels_like} °F`;
    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind: ${speed} mph`;
  },
  search() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document
  .querySelector(".search button")
  .addEventListener("click", () => weather.search());

document.querySelector(".search-bar").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    weather.search();
  }
});
