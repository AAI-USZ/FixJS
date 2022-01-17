function(position) {

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
		
		// setup the centering info
		centerinfo = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
		};

		// initialize the map and center it at the user's location
		SONGMAP.initMap("map", SONGMAP.defaults.zoom, centerinfo);
		
		// now, request the songs 
		APP.getSongs(centerinfo);
		
	}