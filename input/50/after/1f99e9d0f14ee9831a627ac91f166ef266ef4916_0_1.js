function(isp, status)
	{
		console.log(uMarker, markers.length)
		return;
		uMarker.isp = ispName = isp;
		uMarker.status = status;
		uMarker.time = Date.now();
		drawMap();
	}