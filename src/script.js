 let apiKey = "b9ba0314a93083136d968577c718e31d";
 
 function UrlExists(url) {
        let http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if (http.status != 404)
            return true;
        else
            return false;
      }

  function changeIcon(response) {
        let icon = document.querySelector("#icon");
        if (response.data.weather[0].id > 199 && response.data.weather[0].id< 600)
        {icon.innerHTML= `<img src="img/icon200.png" height= "58px">`}
        if (response.data.weather[0].id > 599 && response.data.weather[0].id< 700)
        {icon.innerHTML= `<img src="img/icon600.png" height= "58px">`}
          if (response.data.weather[0].id > 699 && response.data.weather[0].id< 800)
        {icon.innerHTML= `<img src="img/icon700.png" height= "58px">`}
          if (response.data.weather[0].id === 800)
        {icon.innerHTML= `<img src="img/icon800.png" height= "58px">`}
        if (response.data.weather[0].id > 800 && response.data.weather[0].id< 805)
        {icon.innerHTML= `<img src="img/icon80X.png" height= "58px">`}
      }

    function changeGradient(response) {
        let temperature = Math.round(response.data.main.temp);
        let gradient = document.getElementById("gradient");
        let github = document.getElementById("github");
        if (temperature < 0)
        {github.style.color = `rgba(180,200,200,1)`;
        gradient.style.background = `linear-gradient(54deg, rgba(193,214,232,1) 0%, rgba(255,255,255,1) 58%, rgba(180,200,200,1) 100%)`;}
        if (temperature >= 0 && temperature < 15)
        {github.style.color = `rgba(131,131,163,1`;
        gradient.style.background = `linear-gradient(54deg, rgba(190,194,213,1) 0%, rgba(176,198,198,1) 58%, rgba(131,131,163,1) 100%)`;}
        if (temperature >= 15)
        {github.style.color = `rgba(230,200,232,1)`;
        gradient.style.background = `linear-gradient(54deg, rgba(228,195,107,1) 0%, rgba(244,242,191,1) 58%, rgba(230,200,232,1) 100%)`;}
      }
    

 function showWeather(response) {
        let temperature = Math.round(response.data.main.temp);
        celciusTemp = temperature;
        let currentTempUnit=document.querySelector("#current-temp-unit");
        let wind = Math.round(response.data.wind.speed);
        let humidity = Math.round(response.data.main.humidity);
        let name = (response.data.name.toUpperCase());
        let currentTempValue = document.querySelector("#current-temp-value");
        let currentWindValue = document.querySelector("#wind-speed");
        let currentHumidityValue = document.querySelector("#humidity");
        let currentCity = document.querySelector("#current-city");
        currentWindValue.innerHTML = `${wind}`;
        currentTempValue.innerHTML = `${temperature}`;
        currentTempUnit.innerHTML = `C`;
        currentHumidityValue.innerHTML = `${humidity}`;
        currentCity.innerHTML = `${name}`;
        changeIcon(response);
        changeGradient(response);
      }
  
function newCity(event) {
        event.preventDefault();
        let newCity = document.querySelector("#enter-city");
          let currentCity = document.querySelector("#current-city");
        if (newCity.value) {
          currentCity.innerHTML = `${newCity.value.toUpperCase()}`;
        } 
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&&units=metric`;
       axios.get(url).then(showWeather);
        newCity.value=null;
        if (UrlExists(url)===false){
        alert("Unfortunately the forecast for this city cannot be shown. Enter another city or use geolocation.");
        currentCity.innerHTML = `ENTER ANOTHER CITY`;}
      }

function currentPosition(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
        axios.get(url).then(showWeather);
      }

function getCoordinates(event) {
        navigator.geolocation.getCurrentPosition(currentPosition);
      }

let newCityForm = document.querySelector("#enter-city-form");
newCityForm.addEventListener("submit", newCity);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];
let currentDay = document.querySelector("#current-day");
let currentTime = document.querySelector("#current-time");
let hour = now.getHours();
 if (hour < 10) {
    hour = `0${hour}`;
  }
let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

currentDay.innerHTML = `${day.toUpperCase()}`;
currentTime.innerHTML =`${hour}:${minutes}`;

function changeTempUnit(event) {
event.preventDefault();
let currentTempValue = document.querySelector("#current-temp-value");
let temperatureF = (celciusTemp * 9) / 5 + 32;
let currentTempUnit=document.querySelector("#current-temp-unit");

if (currentTempUnit.innerHTML === "C") {
currentTempValue.innerHTML=Math.round(temperatureF);
currentTempUnit.innerHTML = `F`; } else {
currentTempValue.innerHTML=celciusTemp; 
currentTempUnit.innerHTML = `C`;
}
}

let celciusTemp = null;

let currentTemp = document.querySelector("#current-temp");
currentTemp.addEventListener("click", changeTempUnit);

let findLocation = document.querySelector("#find-location");
findLocation.addEventListener("click", getCoordinates);

navigator.geolocation.getCurrentPosition(currentPosition);