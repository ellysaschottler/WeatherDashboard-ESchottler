
var cityHistoryArray = [];
var APIKey = "af36b85d3236ca25f03ced5a81cc6ee6";
var cityName
var cityNameInput = document.querySelector("#city-name")
var cityHistoryContainerEl = document.querySelector("#city-history")
var currentWeatherContainerEl= document.querySelector("#current-day-data")
var weatherForecastContainerEl = document.querySelector("#five-day-forecast")
var cityNameDispayEl = document.querySelector("#city-name-display")
var searchForm = document.querySelector("#search-form")
var lat
var lon


function getCurrentWeather (){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL).then (function(response){
        return response.json();
    })
    .then(function(data){
        lat = data.coord.lat
        lon = data.coord.lon

        var cityNameDataEl = document.createElement("h2")
        cityNameDataEl.textContent = data.name
        cityNameDispayEl.appendChild(cityNameDataEl)
        renderWeatherBlock(data, currentWeatherContainerEl)
        getForecastWeather()
    })
}
 
// Get the weather forecast data (note: the for loop getting all 5 days of weather forecast increments i by 8 
// since the weather forecast is updated every 3 hours and we just need daily)
function getForecastWeather() {
    var queryURL2 ="http://api.openweathermap.org/data/2.5/forecast?lat=" +lat + "&lon=" +lon + "&appid=" + APIKey + "&units=imperial";
        fetch(queryURL2).then (function(response){
            return response.json();
        })
        .then(function(data){
            for (var i=7; i <=39 && data.list.length >=i; i+=8){
            renderWeatherBlock(data.list[i], weatherForecastContainerEl)
            }
        })
}

//Append weather data to the html
function renderWeatherBlock(weatherData, weatherContainer){
    var weatherForecastListEl = document.createElement("ul")
    var dateEl = document.createElement("li");
    dateEl.textContent = dayjs.unix(weatherData.dt).format("MM/DD/YYYY")
    var iconListEl = document.createElement("li")
    var iconEl = document.createElement("img");
    iconEl.src = "http://openweathermap.org/img/w/"+weatherData.weather[0].icon+".png"
    iconListEl.appendChild(iconEl)
    var tempEl = document.createElement("li")
    tempEl.textContent = "Temp: " +weatherData.main.temp +"°F"
    var windEl = document.createElement("li")
    windEl.textContent = "Wind: "+ weatherData.wind.speed +" MPH"
    var humidityEl = document.createElement("li")
    humidityEl.textContent = "Humidity: "+weatherData.main.humidity + "%"
    
    weatherForecastListEl.appendChild(dateEl)
    weatherForecastListEl.appendChild(iconListEl)
    weatherForecastListEl.appendChild(tempEl)
    weatherForecastListEl.appendChild(windEl)
    weatherForecastListEl.appendChild(humidityEl)
    weatherContainer.appendChild(weatherForecastListEl)
}

// Set the City name and store it and add it to the city history display
searchForm.addEventListener("submit", function (e){
    e.preventDefault()
    if (cityNameInput.value == ""){
        return
    }
    cityName = cityNameInput.value  
    cityHistoryArray.push(cityName)
    localStorage.setItem("city", JSON.stringify(cityName));
    cityNameInput.value = ""
    currentWeatherContainerEl.innerHTML=""
    weatherForecastContainerEl.innerHTML = ""
    getCurrentWeather()
    renderCityHistory ()

})

// Renders all the stored City Names that have been entered, and clears
function renderCityHistory() {
    cityNameInput.innerHTML=""; 
    cityNameDispayEl.innerHTML="";
    cityHistoryContainerEl.innerHTML="";
        for (var i = 0; i < cityHistoryArray.length; i++) {
            var historyListItem = cityHistoryArray[i];
            var button = document.createElement("button");
            button.textContent = historyListItem;
            button.setAttribute("class","btn btn-secondary")
            cityHistoryContainerEl.appendChild(button)
    }
}

// On click need to update cityName to the name clicked
cityHistoryContainerEl.addEventListener("click", function(event) {
   cityName =event.target.textContent
   currentWeatherContainerEl.innerHTML=""
   weatherForecastContainerEl.innerHTML = ""
   getCurrentWeather()
   renderCityHistory ()
} )
