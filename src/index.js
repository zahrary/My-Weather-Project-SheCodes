function refreshWeather(response) {
  let temperatureElement = document.querySelector("#tempo");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  temperatureElement.innerHTML = Math.round(temperature);
  let icon = document.querySelector("#img-icon");

  icon.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="icon"
      alt=""
    />
  `;
}
function formatDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}
function searchCity(city) {
  let apiKey = "be23329f1oeeef2ee4ea0141bf0ba2tf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Vienna");
