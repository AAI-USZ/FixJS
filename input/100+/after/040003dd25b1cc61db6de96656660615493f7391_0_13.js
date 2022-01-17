function () {
    var lastLocation = komoo.utils.readCookie('lastLocation');
    var zoom = parseInt(komoo.utils.readCookie('lastZoom'), 10);
    if (lastLocation && zoom) {
        if (window.console) console.log('Getting location from cookie...');
        lastLocation = lastLocation.split(',');
        var center = new google.maps.LatLng(lastLocation[0], lastLocation[1]);
        this.googleMap.setCenter(center);
        this.googleMap.setZoom(zoom);
        return true;
    }
    return false;
}