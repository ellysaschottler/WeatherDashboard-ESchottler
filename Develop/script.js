// Bootcamp-key af36b85d3236ca25f03ced5a81cc6ee6
// dt looks like the unix date - use dayjs to convert to readable date
// var date = dayjs.unix(enterVariableForDate).format("MM/DD/YYYY")

var APIKey = "af36b85d3236ca25f03ced5a81cc6ee6";

var cityName = "Rochester"
// var currentWeather
// var forecastWeather

// var weather = Date, weather-icon, temp, wind-speed , humidity

// var stateName

//for current weather
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
//for forecast weather
var queryURL2 ="http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;



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
console.log("icon" + data[1])
console.log("unix-date"+data.dt)
})
