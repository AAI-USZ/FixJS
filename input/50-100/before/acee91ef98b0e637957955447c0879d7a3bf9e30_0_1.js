function(obj)
	{
		if (uMarker) {
			uMarker.setPosition(new google.maps.LatLng(obj.lat, obj.lng));
			searchCircle.setCenter(new google.maps.LatLng(obj.lat, obj.lng));
			drawMap();
		}
	}