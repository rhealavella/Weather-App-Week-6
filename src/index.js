// Geolocation: Coordinates for Current Location
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  if (cityName) {
    // Check if cityName is defined
    let currentCity = `${cityName}`;
    let currentTemp = `${temperature}˚ C`;
    let h1 = document.querySelector("h1");
    let h2 = document.querySelector("h2");
    h1.innerHTML = currentCity;
    h2.innerHTML = currentTemp;
  }
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
  axios.get(url).then(showTemperature);
}

// Click event listener for the button
let currentWeather = document.querySelector(".btn.btn-outline-light");
currentWeather.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(currentLocation);
});

// Search Engine: Weather for City Search Input
function searchTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");

  if (cityName && cityName.trim() !== "") {
    let searchCity = `${cityName}`;
    let searchTemp = `${temperature}˚ C`;
    h1.innerHTML = searchCity;
    h2.innerHTML = searchTemp;
  }
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-bar");
  let city = searchInput.value;
  let key = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(url).then(searchTemperature);
}

let form = document.querySelector(".btn.btn-primary");
form.addEventListener("click", search);
