function(a)
	{
		for (var i = a.length - 1; i >= 0; i--) {
	// build the markers and add them to the markers array //
			var m = addMarker(a[i]);
			if (a[i].user == true) uMarker = m;
		}
		drawMap();
	}