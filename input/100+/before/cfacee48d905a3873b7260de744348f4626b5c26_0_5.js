function(lat, lng)
	{
		searchCircle = new google.maps.Circle({
			map: map,
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF0000",
			fillOpacity: 0.25,
			radius: GoogleMap.calcMilesToMeters(searchArea / 2),
			center: new google.maps.LatLng(lat, lng)
		});
		google.maps.event.addListener(searchCircle, 'click', function(e) { win.hide(); });
	}