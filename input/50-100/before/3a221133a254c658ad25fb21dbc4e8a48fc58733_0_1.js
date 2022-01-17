function(isp, status)
	{
		console.log('marker = ',uMarker, 'markers.length = ',markers.length);
		if (uMarker){
			uMarker.isp = ispName = isp;
			uMarker.status = status;
			uMarker.time = Date.now();
			drawMap();
		}
	}