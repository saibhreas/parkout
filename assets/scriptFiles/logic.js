
// *! CONFIRMED VARIABLES
// todo: global variables

var hours = $("#hours").on("click",);
console.log(hours);
var amenities = $("#amenities").on("click",);
console.log(amenities);
var alerts = $("#alerts").on("click",);
console.log(alerts);
var ContainerEl = document.querySelector('#container');
var MAPQ_API_KEY = "yQcB9Koy5KFxIcWM6GPCjCJ132aiYGhh";

// hours amenities alerts

// TODO declare & troubleshoot


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

