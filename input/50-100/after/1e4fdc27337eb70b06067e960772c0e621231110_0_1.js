function(isp, status)
	{
		console.log('uMarker='+uMarker);
		if (uMarker){
			uMarker.isp = ispName = isp;
			uMarker.status = status;
			uMarker.time = Date.now();
			drawMap();
		}
	}