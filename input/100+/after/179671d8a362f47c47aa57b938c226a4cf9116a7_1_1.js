function initMiniMap() {
        //open up the map
        console.log("initializing map");
        
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
        //map2 = null;
        map2 = new google.maps.Map(document.getElementById("miniMapCanvas"),myOptions);
        }