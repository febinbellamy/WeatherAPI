import WEATHER_API_KEY from "./apikey.js";

// function to round the temp and feels_like temp to the nearest integer
function roundToNearestNum(num) {
  return Math.floor(num + 0.5);
}

let weather = {
  // an object to store the functions & variables needed to use the two APIs
  apiKey: WEATHER_API_KEY,

  // Find the longitude and latitude of a city
  fetchWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Imperial&appid=${this.apiKey}`
    )
      .then((res) => res.json())
      .then((data) => this.extractLatLon(data))
      .catch((e) => console.log("Error!", e));
  },
  extractLatLon(data) {
    // Grab the longitude, latitude, and name of the city from the data/2.5/weather api, and store the info in variables.
    const lon = data.coord.lon;
    const lat = data.coord.lat;
    const name = data.name;

    // use the longitude and latitude values as parameters for the second api request
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=Imperial&exclude=minutely,hourly&appid=${this.apiKey}`
    )
      .then((res) => res.json())
      .then((oneCallData) => {
        const icon = oneCallData.daily[0].weather[0].icon;
        const description = oneCallData.daily[0].weather[0].description;
        const temp = oneCallData.daily[0].temp.day;
        const feels_like = oneCallData.daily[0].feels_like.day;
        const precipitation = oneCallData.daily[0].pop;

        // use the dom to update the text in between the elements
        document.querySelector(".city").innerHTML = `Weather in ${name}`; //
        document.querySelector(
          ".icon"
        ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector(".description").innerHTML = `${description}`;
        document.querySelector(
          ".temp"
        ).innerHTML = `Current Temperature: ${roundToNearestNum(temp)} °F`;
        document.querySelector(
          ".feelslike"
        ).innerHTML = `Feels like ${roundToNearestNum(feels_like)} °F`;
        document.querySelector(".precipitation").innerHTML = `Chance of rain: ${
          precipitation * 100
        }%`;
      })
      .catch((e) => console.log("Error!", e));
  },
  search() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// if a user types in a city name in the input box and presses the enter key or clicks on the search button, the search() function will execute.
document
  .querySelector(".search button")
  .addEventListener("click", () => weather.search());

document.querySelector(".search-bar").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    weather.search();
  }
});
