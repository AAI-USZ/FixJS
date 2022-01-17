function(a) {
        var center = new google.maps.LatLng(a.coords.latitude, a.coords.longitude);
        $('#locateButton').siblings('img').hide();
        var zoomLevel = 14;

        if (a.coords.accuracy > 500)
            zoomLevel = 10;

        map.setCenter(center);
        map.setZoom(zoomLevel);

        if (overlay) {
            overlay.setMap(null);
            overlay = null;
        }

        overlay = new google.maps.Circle({
            center: center,
            radius: a.coords.accuracy,
            fillColor: '#0000ff',
            fillOpacity: 0.2,
            strokeColor: '#0000ff',
            strokeOpacity: 1,
            strokeWeight: 1
        });
        overlay.setMap(map);
    }