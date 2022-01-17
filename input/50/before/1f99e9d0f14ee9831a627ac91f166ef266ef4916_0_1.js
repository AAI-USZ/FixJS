function(isp, status)
	{
		return;
		uMarker.isp = ispName = isp;
		uMarker.status = status;
		uMarker.time = Date.now();
		drawMap();
	}