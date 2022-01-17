function(encoded) {
	var origin = { lng: 0, lat: 0 };
	var error = { lng: 180, lat: 90 };

	var precision = encoded.length;
	var currentPrecision = 0;

	while(currentPrecision < precision) {
		error.lng /= 2;
		error.lat /= 2;

		var quadrant = encoded[currentPrecision];
		if(quadrant === '0') {
			origin.lng -= error.lng;
			origin.lat += error.lat;
		} else if(quadrant === '1') {
			origin.lng += error.lng;
			origin.lat += error.lat;
		} else if(quadrant === '2') {
			origin.lng -= error.lng;
			origin.lat -= error.lat;
		} else {
			origin.lng += error.lng;
			origin.lat -= error.lat;
		}

		++currentPrecision;
	}

	return { origin: origin, error: error };
}