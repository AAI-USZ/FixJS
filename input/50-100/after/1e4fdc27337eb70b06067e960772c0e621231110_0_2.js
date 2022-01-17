function(a)
	{
		for (var i = a.length - 1; i >= 0; i--) {
	// build the markers and add them to the markers array //
			if (a[i].user == false) {
				addMarker(a[i]);
			}	else{
				uMarker = drawGeoMarker(a[i]);
			}
		}
		console.log('addMarkers uMarker'+uMarker+' length='+markers.length);
		drawMap();
	}