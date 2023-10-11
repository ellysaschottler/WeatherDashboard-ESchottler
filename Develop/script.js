// Bootcamp-key af36b85d3236ca25f03ced5a81cc6ee6
// dt looks like the unix date - use dayjs to convert to readable date
// var date = dayjs.unix(enterVariableForDate).format("MM/DD/YYYY")
// note: the for loop getting all 5 days of weather forecast will have to increment i by 8 
//- the weather forecast is updated every 3 hours and we just need daily.
// it will also have to start on i=7, i=7 is about 24hrs past current time


var APIKey = "af36b85d3236ca25f03ced5a81cc6ee6";

var cityName= "Rochester" // for example data - set to cityNameInput when ready

var cityNameInput = document.querySelector("#city-name")
var currentWeatherContainerEl= document.querySelector("#current-day-data")
var weatherForecastContainerEl = document.querySelector("#five-day-forecast")
var currentWeather
var forecastWeather

// var weather = Date, weather-icon, temp, wind-speed , humidity

var lat = 43.1548 // for example data, set to data.coord.lat when ready
var lon = -77.6156 // for example data, set to data.coord.lon when ready

//for current weather
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
//for forecast weather
var queryURL2 ="http://api.openweathermap.org/data/2.5/forecast?lat=" +lat + "&lon=" +lon + "&appid=" + APIKey + "&units=imperial";
// queryURL2 full address for example: https://api.openweathermap.org/data/2.5/forecast?lat=43.1548&lon=-77.6156&appid=af36b85d3236ca25f03ced5a81cc6ee6&units=imperial


// function getWeather (data){
//     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey +"&units=imperial";
    

// }


fetch(queryURL)
.then (function(response){

return response.json();
})
.then(function(data){
    // getWeather(data)
console.log(data) // gets whole data
console.log("weather-icon-code" +data.weather[0].icon)
console.log("speed" +data.wind.speed)
console.log("humidity"+data.main.humidity)
console.log("temp" + data.main.temp)
console.log("unix-date"+data.dt)
console.log("lat" +data.coord.lat)
console.log("lon" + data.coord.lon)
})

fetch(queryURL2)
.then (function(response){

return response.json();
})
.then(function(data){
    // getWeather(data)
console.log("weather-icon-code" +data.list[0].weather[0].icon)
console.log("speed" +data.list[0].wind.speed)
console.log("humidity"+data.list[0].main.humidity)
console.log("temp" + data.list[0].main.temp)
// console.log("icon" + data[1])
console.log("unix-date"+data.list[0].dt)

})


  // set city to local storage 
  localStorage.setItem("city", JSON.stringify(cityNameInput));