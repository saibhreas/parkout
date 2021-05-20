var searchPark = $("#search-park");
var APIKEY ="VRq01T2PTTEsDDdQH4d48sOdJR5ArxHGCsa14z4H"

$( document ).ready(function() {
  console.log( "ready!" );

  async function currentWeather(loc) {

    var apiUrl = `https://developer.nps.gov/api/v1/parks?stateCode=nj&stateCode={APIKEY}`;

    var response = await fetch(apiUrl);
    var data = await response.json();
    console.log(data);
  
    return data;

}


});