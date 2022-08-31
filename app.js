let weather = {
  // an object to store the functions & variables needed to use the API

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
    document.querySelector(".temp").innerHTML = `${temp} °F)`;
    document.querySelector(".feelslike").innerHTML = `${feels_like} °F`;
    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind: ${speed} mph`;
    document.querySelector(
      "body"
    ).style.backgroundImage = `url(https://images.unsplash.com/photo-1503788760144-795d5cdf0f56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`;
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
