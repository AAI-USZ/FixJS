function(a)
	{
		console.log('adding markers')
		for (var i = a.length - 1; i >= 0; i--) {
		console.log(a[i].isp);
		console.log(a[i].status)
		console.log(a[i].user)
	// build the markers and add them to the markers array //
			if (a[i].user == false) {
				addMarker(a[i]);
			}	else{
				uMarker = drawGeoMarker(a[i]);
			}
		}
		console.log('**markers = '+markers);
		console.log('**markers.length = '+markers.length);
		console.log('**marker = '+uMarker)
		drawMap();
	}