function mapServiceProvider(lat,lng,id,z) {
    alert('dss');
    var myOptions = {
        zoom: z,
        center: new google.maps.LatLng(lat,lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById(id),myOptions);

    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    var directionsDisplay = new google.maps.DirectionsRenderer();
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