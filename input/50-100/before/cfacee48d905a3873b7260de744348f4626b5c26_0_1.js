function(a)
	{
		for (var i = a.length - 1; i >= 0; i--) {
	// detect which markers are within the search area so we can draw an average status value //
			a[i].inCircle = searchCircle.contains(new google.maps.LatLng(a[i].lat, a[i].lng));
	// build the markers and add them to the markers array //
			addMarker(a[i]);
		}
		drawMap();
	}