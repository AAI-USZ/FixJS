function calcRoute() {
    var directionsService = new google.maps.DirectionsService();

    if (origin == null) {
        alert("Click on the map to add a start point");
        return;
    }

    if (destination == null) {
        alert("Click on the map to add an end point");
        return;
    }

    var mode;
    switch (document.getElementById("mode").value) {
        case "bicycling":
            mode = google.maps.DirectionsTravelMode.BICYCLING;
            break;
        case "driving":
            mode = google.maps.DirectionsTravelMode.DRIVING;
            break;
        case "walking":
            mode = google.maps.DirectionsTravelMode.WALKING;
            break;
    }

    var request = {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: mode,
        optimizeWaypoints: document.getElementById('map_optimize').checked,
        avoidHighways: document.getElementById('map_highways').checked,
        avoidTolls: document.getElementById('map_tolls').checked
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    clearMarkers();
    directionsVisible = true;
}