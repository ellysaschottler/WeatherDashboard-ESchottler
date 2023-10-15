// Bootcamp-key af36b85d3236ca25f03ced5a81cc6ee6
// dt looks like the unix date - use dayjs to convert to readable date
// var date = dayjs.unix(enterVariableForDate).format("MM/DD/YYYY")

// it will also have to start on i=7, i=7 is about 24hrs past current time
//(for (var i=7; i <=39; i+=8)    // Our weather forecast is given in 3 hour increments, we want one forecast each for 5 days, so the index will increment by 8 (24))
// queryURL2 full address for example: https://api.openweathermap.org/data/2.5/forecast?lat=43.1548&lon=-77.6156&appid=af36b85d3236ca25f03ced5a81cc6ee6&units=imperial
// var weather = Date, weather-icon, temp, wind-speed , humidity
// http://openweathermap.org/img/w/10d.png // is the url of the icon images - just update the "10d" to the correct code



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
        console.log(response.ok)
        return response.json();
    })
    .then(function(data){
        console.log(data)
        console.log(data.name)
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
            console.log(response.ok)
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

// Set the City name and store it and add it to the city history 
searchForm.addEventListener("submit", function (e){
    e.preventDefault()
    cityName = cityNameInput.value  
    cityHistoryArray.push(cityName)
    localStorage.setItem("city", JSON.stringify(cityName));
    cityNameInput.value = ""
    currentWeatherContainerEl.innerHTML=""
    weatherForecastContainerEl.innerHTML = ""
    getCurrentWeather()
    renderCityHistory ()

})



//After storing, set to city history list
function init() {
    var storedCityNames = JSON.parse(localStorage.getItem("city"))

    if (storedCityNames != null) {
        cityHistoryArray = storedCityNames
    }
}

// Renders all the stored City Names that have been entered
function renderCityHistory() {
    cityNameInput.innerHTML=""; // clears city name after it is searched for
    cityNameDispayEl.innerHTML="";
        for (var i = 0; i < cityHistoryArray.length; i++) {
            var historyListItem = cityHistoryArray[i];
            var li = document.createElement("li");
            li.textContent = historyListItem;
            cityHistoryContainerEl.appendChild(li)
    }
}

// On click need to update cityName to the name clicked
cityHistoryContainerEl.addEventListener("click", function(event) {
    console.log(event.target)
// need to get the city name clicked to go to cityName 


} )














//Query 1 data getters:
// console.log(data) // gets whole data
// console.log("weather-icon-code" +data.weather[0].icon)
// console.log("speed" +data.wind.speed)
// console.log("humidity"+data.main.humidity)
// console.log("temp" + data.main.temp)
// console.log("unix-date"+data.dt)
// console.log("lat" +data.coord.lat)
// console.log("lon" + data.coord.lon)

// Query 2 data getters:
// console.log("weather-icon-code" +data.list[0].weather[0].icon)
// console.log("speed" +data.list[0].wind.speed)
// console.log("humidity"+data.list[0].main.humidity)
// console.log("temp" + data.list[0].main.temp)  
// console.log("unix-date"+data.list[0].dt)
// // replace 8 with i for looping when ready
// console.log("weather-icon-code2" +data.list[8].weather[0].icon)
// console.log("speed2" +data.list[8].wind.speed)
// console.log("humidity2"+data.list[8].main.humidity)
// console.log("temp2" + data.list[8].main.temp)  
// console.log("unix-date2"+data.list[8].dt)