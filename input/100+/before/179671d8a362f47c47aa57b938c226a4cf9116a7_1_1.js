function initMiniMap() {
        //open up the map
        console.log("initializing map");
        
        //postion for marker
        var lat_m = latitude;//37.79787684894448;
        var lng_m = longitude;//-83.7020318012207;
        
        //Center of map upon init:
        var lat = latitude;//37.839479235926156;
        var lng = longitude;//-83.65678845996092;
        
        var map_center = new google.maps.LatLng(lat,lng);
        // NOTE: mapTypeId is required... lol wow.
        var myOptions = {
            center: map_center,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
                        
        //this needs to be global because im going to call it later. A lot.
        map2 = new google.maps.Map(document.getElementById("miniMapCanvas"),myOptions);
        
        //add a marker:
        you_icon = 'images/person_you.png';
        marker_pos = new google.maps.LatLng(lat_m,lng_m);
    
        marker_pos = new google.maps.Marker({
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
        
        }