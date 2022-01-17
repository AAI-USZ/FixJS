function () {
var hasAccepted = false;

function check_geolocation(location) {
  var geoCheck = document.getElementById("geo_check");
  geoCheck.innerHTML = "in check geolocation<br />";
  if (location) { d.innerHTML += "Valid geolocation information found<br />" }

  var coords = location.coords;
d.innerHTML += "Coords: Latitude: " + coords.latitude + "<br />"
d.innerHTML += "Coords: Longitude: " + coords.longitude + "<br />"
d.innerHTML += "Coords: Altitude: " + coords.altitude + "<br />"
d.innerHTML += "Coords: Accuracy: " + coords.accuracy + "<br />"
d.innerHTML += "Coords: AltitudeAccuracy: " + coords.altitudeAccuracy + "<br />"
d.innerHTML += "Coords: Heading: " + coords.heading + "<br />"
d.innerHTML += "Coords: Speed: " + coords.speed + "<br />"

	//code for google map
  //mapsurl = "http://maps.google.com/maps?f=q&source=s_q&hl=en&q=" + coords.latitude + ",+" + coords.longitude;
  //d.innerHTML += "<iframe name=map src=" + mapsurl + " width=80% height=80%></iframe>"

}

function successCallback(position) {
  check_geolocation(position);
}

function accept() {
  hasAccepted = true;
}

navigator.geolocation.getCurrentPosition(successCallback, null, null);

setTimeout(accept, 50);
        
}