//get date
let getDate = document.querySelector("#changeDate");
let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekdays[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  getDate.innerHTML = `${day}, ${hour}:0${minutes}`;
} else {
  getDate.innerHTML = `${day}, ${hour}:${minutes}`;
}

let search = document.querySelector("#search-sinal");
let apiKey = "b01b330012699bdf6ed530375ada87c3";
let getFahrenheit = document.querySelector("#fahrenheit");
let getCelsius = document.querySelector("#celsius");

search.addEventListener("click", searchCity);

function searchCity(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#input-box");
  let defaultCity = document.querySelector(".city");
  defaultCity.innerHTML = chosenCity.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function showWeather(response) {
  let temperature = document.querySelector(".temp");
  let temp = Math.round(response.data.main.temp);
  temperature.innerHTML = temp;
  let defaultCity = document.querySelector(".city");
  defaultCity.innerHTML = response.data.name;
}

let here_button = document.querySelector("#here-button");
here_button.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
});

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlCoords).then(showWeather);
}
