function reset_coords(){
        console.log("opening mini map for event");
        initMiniMap();
        
        $('#postEventMiniMap').show();
        
        console.log("begin client side geocode query");
        var geocoder = new google.maps.Geocoder();
        var address = $('#eventLocation').val();
        if(address == ""){
            address = "45221";
            }
        
        console.log(address);   
            
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map2.setCenter(results[0].geometry.location);
                console.log(results);
                marker_you.setPosition(results[0].geometry.location);
                }
            });
        }