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
    var parkList = $('#park-list');
    var timeDispEl = $("#time-display");
    var apiKey = "653094733b20fc02dc6f1e6e6b8bf37e";

    // TODO declare & troubleshoot
    // TODO: GLOBAL VARIABLES
    var chosenPark = $("#chosen-park");

    function npsApiCall(parkNJ) {
        var npsKey = "aKdQbl5YRDOdOcAzaiDfbacSBby5NQWEU8s5Mi5D";
        var npsUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${parkNJ}&api_key=${npsKey}`
        console.log("my park list: ", npsUrl);
        $.ajax({
            url: npsUrl,
            success: function (response) {
                console.log(response.data);
                $("#myList").empty();
                for (let i = 0; i < response.data.length; i++) {
                    var nameP = response.data[i].fullName;
                    var latP = response.data[i].latitude;
                    console.log(latP);
                    var longP = response.data[i].longitude;
                    console.log(longP);
                    var contactP = response.data[i].contacts;
                    console.log(contactP);
                    var activitiesP = response.data[i].activities[0];
                    console.log(activitiesP);
                    var feesP = response.data[i].entranceFees[0].cost;
                    console.log(feesP);
                    $("#myList").append("<a class='dropdown-item' href='#'> + nameP + '</a>'")
                }
                console.log(latitude, longitude);
                mapQuestApiCall(latitude, longitude);
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


    //*! LAT & LONGITUDE
    function mapQuestApiCall(x, y) {
        // console.log(x, y)
        var mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${MAPQ_API_KEY}&center=&zoom=10&type=hyb&size=600,400@2x`;
        // var mapUrl = "https://www.mapquestapi.com/staticmap/v5/map?key=" + MAPQ_API_KEY + "&center=" + x + "," + y + "&zoom=10&type=hyb&size=600,400@2x";
        console.log(mapUrl)
    };
    // *? ALL ABOVE ARE ORIGINAL TO PARKOUT


    // todo gets selected city CURRENT park searched
    // function getCurrentPark(event) {
    //     event.preventDefault();

    //     // TODO gather park element
    //     var park = $("#park-name").val();
    //     console.log("current park searched was: ", park);

    //     // TODO keep only one of these if you wish to append text to the park
    //     $("#chosen-park").text(park);
    //     $("#current-park").text(park);
        
    //     // TODO choose lat and lon from one api, mapq or nps
    //     var mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${MAPQ_API_KEY}&center=&zoom=10&type=hyb&size=600,400@2x`;        
    //     var npsUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${parkNJ}&api_key=${npsKey}`        
    //     console.log("chosen api searched url: ", mapUrl,npsUrl);

    //     $.ajax({
    //         url: currentUrlApi,
    //         success: function (response) {
    //             console.log("object extracted: ", response);
    //             console.log("attempting to pull the json: ", response.weather[0].icon);
    //             console.log("this is the lat, then lon: ", response.coord.lat, response.coord.lon);
    //             getFiveDayWeatherApi(response.coord.lat, response.coord.lon);
    //         },
    //         error: function (xhr, status, error) {
    //             console.log("status: ", status)
    //             console.log("error: ", error)
    //         },
    //         complete: function (xhr, status) {
    //             console.log("complete: ", status)
    //         }
    //     })
    // };
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
        $("#current-park-container").empty();
    });

    setInterval(displayTime, 1000);
    searchParkBtnEl.on("click", getCurrentPark);
});
