function drawPath(output)
	{
		var unparsedCoords = output.split(",");
		var lat = 0;
		var lon = 0;
		
		bounds = new google.maps.LatLngBounds();
		
		flightPath = new google.maps.Polyline({
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 2
		});
		
		coords = flightPath.getPath();
		
		for(var i = 0; i < unparsedCoords.length-1; i++)
		{
			lat = unparsedCoords[i].split("+")[0];
			lon = unparsedCoords[i].split("+")[1];
			
			coords.push(new google.maps.LatLng(lat, lon));
			bounds.extend(new google.maps.LatLng(lat, lon));
		}
		
		flightPath.setMap(map);
		
		map.fitBounds(bounds);
		
		setupMarker();
	}