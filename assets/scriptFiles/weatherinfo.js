//Variable to store the searched park
var park = "Atlanta";

// variable declaration
var searchPark = $("#search-park");
var searchButton = $("#search-button");
var currentPark = $("#current-park");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");
var currentPrecipitation = $("#precipitation")
var sPark = [];
//Set up the API key
var APIKEY = "1e03961191fd6205d5b71042cdc5d758";

async function onSubmitData(e) {
    e.preventDefault();

    let result = await currentWeather();

    // this is api result,

    let htmlResult = "";


    if ($('#temperature').prop("checked") == true) {

        htmlResult += "Temperature: " + result.main.temp + "<br/>";
    }

    if ($('#wind-speed').prop("checked") == true) {
        htmlResult += "Wind Speed: " + result.wind.speed + "<br/>";
    }

    if ($('#humidity').prop("checked") == true) {

        htmlResult += "Humidity: " + result.main.humidity + "<br/>";

        console.log(result.humidity);
    }

    $('#result-wrapper').empty();
    $('#result-wrapper').append(htmlResult);

    return false;
}


// Display the current and future weather to the user after grabing the park form the input text box.
function displayWeather(event) {
    event.preventDefault();

    if (searchPark.val().trim() !== "") {
        park = searchPark.val().trim();
        currentWeather();
    }
}

// Now we make the URL se we can get a data from server side.

// var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${park}&units=metric&appid=${APIKey}`;

async function currentWeather(loc) {

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${APIKEY}`;

    var response = await fetch(apiUrl);
    var data = await response.json();
    console.log(data);
    console.log(data.main.temp, "temperature");
    console.log(data.wind.speed, "wind-speed");
    console.log(data.main.humidity, "humidity");
    return data;

}

// Test