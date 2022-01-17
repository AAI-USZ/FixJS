function() {
        map = new google.maps.Map(document.getElementById("map_canvas"), {
            center: new google.maps.LatLng(37.41, -122.08),
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }