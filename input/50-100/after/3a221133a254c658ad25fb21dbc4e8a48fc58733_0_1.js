function(isp, status)
	{
		console.log('marker = '+uMarker)
		console.log('markers.length = '+markers.length);
		if (uMarker){
			uMarker.isp = ispName = isp;
			uMarker.status = status;
			uMarker.time = Date.now();
			drawMap();
		}
	}