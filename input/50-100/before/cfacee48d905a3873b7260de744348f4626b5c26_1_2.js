function onLocationDetected(ok, e)
	{
		if (e){
			console.log(e);
		} else{
			drawISPList();
			mdl.setLocation(loc.city, loc.state, isps);
		}
	}