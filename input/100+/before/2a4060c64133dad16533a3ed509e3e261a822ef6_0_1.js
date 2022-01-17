function (position, optDisplayMarker) {
    if (optDisplayMarker == undefined) optDisplayMarker = true;
    if (position instanceof Array)
        position = new google.maps.LatLng(position[0], position[0]);
    var komooMap = this;
    var latLng;
    function _go (latLng) {
        if (latLng) {
            komooMap.googleMap.panTo(latLng);
            if (! komooMap.searchMarker) {
                komooMap.searchMarker = new google.maps.Marker();
                komooMap.searchMarker.setMap(komooMap.googleMap);
            }
            if (optDisplayMarker) komooMap.searchMarker.setPosition(latLng);
        }
    }
    if (typeof position == "string") { // Got address
        var request = {
            address: position,
            region: this.region
        };
        this.geocoder.geocode(request, function (result, status_) {
            if (status_ == google.maps.GeocoderStatus.OK) {
                var first_result = result[0];
                latLng = first_result.geometry.location;
                _go(latLng);
            }
        });
    } else {
        if (position instanceof Array) {
            latLng = new google.maps.LatLng(position[0], position[1]);
        } else {
            latLng = position;
        }
        _go(latLng);
    }
}