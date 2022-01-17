function(isp, status)
	{
		console.log('uMarker='+uMarker);
		uMarker.isp = ispName = isp;
		uMarker.status = status;
		uMarker.time = Date.now();
		drawMap();
	}