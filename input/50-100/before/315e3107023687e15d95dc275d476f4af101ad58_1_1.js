function() {
    if(!mapLoaded) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(loadMap, function() {
                alert('Could not detect position.');
            });
        }
    }
    else {
        map.setCenter(lonlat);  
        myRouteVector.destroyFeatures();          
        //markerArray[mapDirect].erase();
    }
}