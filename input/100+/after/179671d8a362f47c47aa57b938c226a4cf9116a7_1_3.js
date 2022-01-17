function reset_coords(){
        console.log("opening mini map for event");
        initMiniMap();
        
        $('#postEventMiniMap').show();
        
        //add a marker:
        var lat_m = latitude;//37.79787684894448;
        var lng_m = longitude;//-83.7020318012207;
        you_icon = 'images/person_you.png';
        marker_pos = new google.maps.LatLng(lat_m,lng_m);
    
        marker_you = new google.maps.Marker({
                map:map2,
                draggable:true,
                animation: google.maps.Animation.BOUNCE,
                position: marker_pos,
                icon: you_icon
            });
            
        // make reverse geocoder object
        revGeocoder = new google.maps.Geocoder();
        // make a listener for the marker
        google.maps.event.addListener(marker_pos, 'mouseup', reset_position_mini);
            
        var geocoder = new google.maps.Geocoder();
        var address = $('#eventLocation').val();
        if(address == ""){
            address = "45221";
            }
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map2.setCenter(results[0].geometry.location);
                console.log(results);
                marker_you.setPosition(results[0].geometry.location);
                }
            });
        }