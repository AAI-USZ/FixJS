function addMarker(latlng) {
     markers.push(new google.maps.Marker({
        position: latlng,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: 'http://maps.google.com/mapfiles/marker' + String.fromCharCode(markers.length + 65) + '.png'
    }));
}