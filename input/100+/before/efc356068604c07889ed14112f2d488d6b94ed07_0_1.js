function() {

	// does this browser expose a
	// geolocation API?
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {

			// I read that FF sometimes
			// calls this multiple times
			// let's avoid that, if we
			// have already set a location,
			// just return
			if (APP.userLocation.isSet) {
				return;
			}

			// record the user's location
			APP.userLocation.lat = position.coords.latitude;
			APP.userLocation.lng = position.coords.longitude;
			APP.userLocation.isSet = true;

			// initialize the map and center it at the user's location
			SONGMAP.initMap("map", SONGMAP.defaults.zoom, {
				lat : position.coords.latitude,
				lng : position.coords.longitude
			});
		}, function(error) {
			console.log("Oh NOES! No location!");
			setTimeout(APP.setUserLocation, 500);
		});
	} else {
		// initialize the map (uses the default center since we could not
		// retrieve user location
		SONGMAP.initMap("map", SONGMAP.defaults.zoom, SONGMAP.defaults.center);
	}
}