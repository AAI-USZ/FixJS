function(isp, status)
	{
		uMarker.isp = ispName = isp;
		uMarker.status = status;
		uMarker.time = Date.now();
		uMarker.setIcon(status == 1 ? markerGreen : markerRed);
		drawMap();
	}