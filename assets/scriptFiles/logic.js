$(document).ready(function () {
    console.log("ready");
    // prepares dom
    // *! CONFIRMED VARIABLES
    // todo: global variables

    var hours = $("#hours").on("click",);
    console.log(hours);
    var amenities = $("#amenities").on("click",);
    console.log(amenities);
    var alerts = $("#alerts").on("click",);
    console.log(alerts);

//
    //button click 


    var MAPQ_API_KEY = "yQcB9Koy5KFxIcWM6GPCjCJ132aiYGhh";
    var getParkBtnEl = $('#get-park-names');
    var parkList = $('#park-list')
    var  = $('');
    var timeDispEl = $("#time-display");
    var apiKey = "653094733b20fc02dc6f1e6e6b8bf37e";
    
    // TODO declare & troubleshoot
    // TODO: GLOBAL VARIABLES
    var chosenCity = $("#chosen-city");

    function npsApiCall() {
        $.ajax({
            url: "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=NJ&api_key=wuCQVj3eIqguFjOi2HEN7r2l4IDFb4FD90hGt35N",
            success: function (response) {
                console.log(response);
                var latitude = response.data[0].latitude;
                var longitude = response.data[0].longitude;
                console.log(latitude, longitude);
                mapQuestApiCall(latitude, longitude);
            }
        })
    };
    npsApiCall();

    //*! LAT & LONGITUDE
    function mapQuestApiCall(x, y) {
        console.log(x, y)
        var mapUrl = "https://www.mapquestapi.com/staticmap/v5/map?key=" + MAPQ_API_KEY + "&center=" + x + "," + y + "&zoom=10&type=hyb&size=600,400@2x";
        console.log(mapUrl)
    };
    // *? ALL ABOVE ARE ORIGINAL TO PARKOUT


    // *! COMPLETED gets selected city CURRENT weather
    function getCurrentPark(event) {
        event.preventDefault();
        var city = $("#city-name").val();
        console.log("current searched was: ", city);
        $("#chosen-city").text(city);
        $("#current-city").text(city);
        var currentUrlApi = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        console.log("current day communication succeed: ", currentUrlApi);
        $.ajax({
            url: currentUrlApi,
            success: function (response) {
                console.log("object extracted: ", response);
                console.log("attempting to pull the json: ", response.weather[0].icon);
                console.log("this is the lat, then lon: ", response.coord.lat, response.coord.lon);
                getFiveDayWeatherApi(response.coord.lat, response.coord.lon);
            },
            error: function (xhr, status, error) {
                console.log("status: ", status)
                console.log("error: ", error)
            },
            complete: function (xhr, status) {
                console.log("complete: ", status)
            }
        })
    };
    // TODO must return null if city is invalid


    // *! COMPLETED gets 5 day weather forecast
    function getFiveDayWeatherApi(lat, lon) {
        var city = $("#city-name").val();
        console.log("current searched was: ", city)
        var fiveDayUrlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=imperial&appid=${apiKey}`
        console.log("fivedayURL: ", fiveDayUrlApi)
        $.ajax({
            url: fiveDayUrlApi,
            success: function (response) {
                console.log("object extracted: ", response);
                console.log(response.daily[0].dt);
                for (var i = 0; i < 6; i++) {
                    var weather = response.daily[i].weather[0].description;
                    var icon = response.daily[i].weather[0].icon;
                    var temp = response.daily[i].temp.day;
                    var uvi = response.daily[i].uvi;
                    var iconImage = $("<img>").attr("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
                    console.log(iconImage)
                    console.log(response.daily[i].temp.day);
                    console.log("div" + '[data-index="' + i + '"]')
                    $("div" + '[data-index="' + i + '"]').append(
                        " weather: " + weather,
                        iconImage, "<br>",
                        " temp: " + temp, "<br>",
                        " uv index: " + uvi
                    );
                    console.log(uvi)
                    // TODO fetch on uv index then displays color to page

                    // if (uvi <= 2) {
                    //     document.getElementsByTagName("H1")[0].setAttribute("class", "democlass");
                    //     uvInd.css({ "background-color": "green" })
                    // } else if (uvi <= 5) {
                    //     uvInd.css({ "background-color": "yellow", "color": "black" })
                    // } else if (uvi <= 7) {
                    //     uvInd.css({ "background-color": "orange" })
                    // } else if (uvi <= 10) {
                    //     uvInd.css({ "background-color": "red" })
                    // } else if (uvi >= 11) {
                    //     uvInd.css({ "background-color": "purple" })
                    // }
                    storeObj = {
                        weather: weather,
                        icon: icon,
                        temp: temp,
                        uvi: uvi,
                    };
                    //*! COMPLETED must store value entered by userinput to user storage
                    localStorage.setItem(city + " day-" + i, JSON.stringify(storeObj));
                };
            },
            error: function (xhr, status, error) {
                console.log("status: ", status)
                console.log("error: ", error)
            },
            complete: function (xhr, status) {
                console.log("complete: ", status)
            }
        })
    };
    // *! COMPLETED time display function
    function displayTime() {
        var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
        timeDispEl.text(rightNow);
        var present = rightNow.substring(0, 6);
        console.log(present)
    };

    $(searchParkBtnEl).click(function () {
        $("#current-weather-container").empty();
        $("#day-one-container").empty();
        $("#day-two-container").empty();
        $("#day-three-container").empty();
        $("#day-four-container").empty();
        $("#day-five-container").empty();
    });

    setInterval(displayTime, 1000);
    searchParkBtnEl.on("click", getCurrentWeather);
});
