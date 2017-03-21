function generate_bullets(argument) {
    responseArea.innerHTML = "Here are some restaurant recommendations for you!"
    for (var i = 0; i < argument.length; i++) {
        list = document.createElement("li")
        list.innerHTML = argument[i]
        responseArea.appendChild(list)
    }
}

function call_api(url) {
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => data.businesses)
        .then(businesses => businesses.map(business => business.name))
        .then(data => {
            generate_bullets(data)
        })
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