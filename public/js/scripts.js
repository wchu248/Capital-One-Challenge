function generate_bullets(argument) {
    responseArea.innerHTML = "Here are some restaurant recommendations for you!"
    for (var i = 0; i < argument.length; i++) {
        list = document.createElement("ul")
        phone = document.createElement("li")
        address = document.createElement("li")
        var parsedData = JSON.parse(JSON.stringify(argument[i]))
        console.log(parsedData)
        list.innerHTML = parsedData[Object.keys(parsedData)[0]]
        phone.innerHTML = "Phone: " + parsedData[Object.keys(parsedData)[1]]
        address.innerHTML = "Address: " + parsedData[Object.keys(parsedData)[2]] + 
                            ", " + parsedData[Object.keys(parsedData)[3]] + 
                            ", " + parsedData[Object.keys(parsedData)[4]] + 
                            " " + parsedData[Object.keys(parsedData)[5]]
        responseArea.appendChild(list)
        responseArea.appendChild(phone)
        responseArea.appendChild(address)
    }
}

var map_array;

function call_api(url) {
    map_array = [['Lat', 'Long', 'Name']]
    fetch(url)
        .then(res => res.json())
        .then(data => data.businesses)
        .then(businesses => businesses.map(business => {
            map_array.push([parseFloat(business.coordinates.latitude), parseFloat(business.coordinates.longitude), business.name])
            return {
                name: business.name,
                phone: business.phone,
                address1: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zip_code: business.location.zip_code
            }
        }))
        .then(data => {
            generate_bullets(data)
            google.charts.setOnLoadCallback(drawChart)
        })
}

// Google Maps JavaScript Load

google.charts.load("current", {packages:["map"]});

function drawChart() {

    var data = google.visualization.arrayToDataTable(map_array);

    var map = new google.visualization.Map(document.getElementById('map_div'));
    map.draw(data, {
      showTooltip: true,
      showInfoWindow: true
    });
}

function process() {
    call_api("/api/search?" + "latitude=" + x.latitude + "&longitude=" + x.longitude + "&term=" + query.value)
}

function questionnaire() {
    const r = (parseInt(radius.value) * 1609.344).toString()
    const price = []
    if (document.getElementById("price1").checked) price.push(price1.value.toString());
    if (document.getElementById("price2").checked) price.push(price2.value.toString());
    if (document.getElementById("price3").checked) price.push(price3.value.toString());
    if (document.getElementById("price4").checked) price.push(price4.value.toString());
    const open_status = true
    if (open.value == "no") {
        open_status = false;
    }
    call_api("/api/search?" + "latitude=" + x.latitude + "&longitude=" + x.longitude + "&term=" + food_question.value +
                           "&radius=" + r + "&price=" + price.join() + "&open_now=" + open_status)
}

// HTML5 GeoLocation

var x = {}

function showPosition(position) {
    x.latitude = position.coords.latitude
    x.longitude = position.coords.longitude
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

getLocation()

// Materialize JavaScript Initialization Functions

$(document).ready(function(){
  $('.parallax').parallax();
});

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});