function(lat, lng)
	{
		if (uMarker == null) {
			map.setCenter(new google.maps.LatLng(lat, lng));
		}	else{
			uMarker.setPosition(new google.maps.LatLng(lat, lng));
	//  redrawing on watchLocation change is cpu intesive //
	//  disabled unless we want to track the user's position across cities
	//  in which case, call on an interval and only if change value is significant 
		// drawMap();
	//  manually reset window position to get around bug on mobile safari //
			if (aMarker) win.setPosition(aMarker.getPosition());
		}
		searchCircle.setCenter(new google.maps.LatLng(lat, lng));
	}