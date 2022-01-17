function onLocationDetected(ok, e)
	{
		if (e){
			console.log('onLocationDetected :: '+e);
		} else{
			drawISPList();
			map.setLocation( { isp : isp, status : status, lat : loc.lat, lng : loc.lng } );
			return;
			if (!initialized) {
				map.getMarkers();
				mdl.setLocation(loc.city, loc.state, isps);
				initialized = true;
			}
		}
	}