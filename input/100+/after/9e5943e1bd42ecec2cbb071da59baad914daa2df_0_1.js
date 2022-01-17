function onLocationDetected(ok, e)
	{
		if (e){
			console.log('onLocationDetected :: '+e);
		} else{
			drawISPList();
			map.setLocation( { isp : isp, status : status, lat : loc.lat, lng : loc.lng } );
			if (initialized == false) {
				initialized = true;
				console.log('getMarkers='+initialized);
				map.getMarkers();
				mdl.setLocation(loc.city, loc.state, isps);
			}
		}
	}