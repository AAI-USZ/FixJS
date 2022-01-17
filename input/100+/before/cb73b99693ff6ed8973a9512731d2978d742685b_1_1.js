function initialize(objMap) {
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = objMap;
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));


    google.maps.event.addListener(map, 'click', function(event) {
        if (origin == null) {
            origin = event.latLng;
            addMarker(origin);
        } else if (destination == null) {
            destination = event.latLng;
            addMarker(destination);
        } else {
            if (waypoints.length < 9) {
                waypoints.push({ location: destination, stopover: true });
                destination = event.latLng;
                addMarker(destination);
            } else {
                alert("Maximum number of waypoints reached");
            }
        }
    });
}