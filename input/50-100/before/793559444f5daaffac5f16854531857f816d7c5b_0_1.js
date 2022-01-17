function(obj)
	{
		if (uMarker == null) {
			map.setCenter(new google.maps.LatLng(obj.lat, obj.lng));
		}	else{
			uMarker.setPosition(new google.maps.LatLng(obj.lat, obj.lng));
			drawMap();
		}
		searchCircle.setCenter(new google.maps.LatLng(obj.lat, obj.lng));
	}