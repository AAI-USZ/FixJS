function init() {

	loc = new google.maps.LatLng(37.762861, -122.442078);
	var mapOptions = {
            center: loc,
            zoom: 13,
	    panControl: true,
            //mapTypeId: google.maps.MapTypeId.HYBRID
            mapTypeId: google.maps.MapTypeId.ROADMAP
            //mapTypeId: google.maps.MapTypeId.SATELLITE
            //mapTypeId: google.maps.MapTypeId.TERRAIN
	};

	map = new google.maps.Map($("#crazy-map")[0], mapOptions);
	// m = new google.maps.Marker({
	//     position: loc,
	//     map: map,	    
	//     title: "Your Location",
	//     shape: {type: 'circle'}
	// });
    }