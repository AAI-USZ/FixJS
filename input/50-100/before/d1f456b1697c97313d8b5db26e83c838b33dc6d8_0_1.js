function() {
        map = new GMap2(document.getElementById("map_canvas"));
        map.setCenter(new GLatLng(37.41, -122.08), 1);
        map.addControl(new GSmallMapControl());
        map.addControl(new GMapTypeControl());
    }