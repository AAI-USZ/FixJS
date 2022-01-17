function testGeocode(address){
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            return true;
            }
        else {
            return false;
            }
        });
    }