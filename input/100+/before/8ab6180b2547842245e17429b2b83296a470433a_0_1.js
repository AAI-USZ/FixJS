function addMarker(data) {

    // remove old markers
    if (markers[data.featuretype] != null) markers[data.featuretype].setMap(null);
    if (data.featuretype === 0 && markers[1] != null) markers[1].setMap(null);

    var markerIcons = [{
        icon: 'img/marker.png'
    }, {
        icon: 'img/marker2.png'
    }]; // selected address, other stuff
    var shadow = new google.maps.MarkerImage('img/marker-shadow.png', new google.maps.Size(41, 41), new google.maps.Point(0, 0), new google.maps.Point(13, 40));

    // add new marker
    markers[data.featuretype] = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.lon),
        map: map,
        animation: google.maps.Animation.DROP,
        icon: markerIcons[data.featuretype].icon,
        flat: false,
        shadow: shadow
    });

    // Create info window
    var infowindow = new google.maps.InfoWindow({
        content: "<div class='infowin-content'>" + data.label + "</div>"
    });
    google.maps.event.addListener(markers[data.featuretype], 'click', function() {
        infowindow.open(map, markers[data.featuretype]);
    });
    infowindow.open(map, markers[data.featuretype]);

    // handle adding new marker to Google Earth
    if (map.getMapTypeId() == "GoogleEarthAPI") googleEarth.refresh_();
}