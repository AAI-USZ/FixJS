function(isp, status)
	{
		console.log('marker = ',uMarker, 'markers.length = ',markers.length);
		uMarker.isp = ispName = isp;
		uMarker.status = status;
		uMarker.time = Date.now();
		drawMap();
	}