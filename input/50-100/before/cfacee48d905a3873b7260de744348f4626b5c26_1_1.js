function(isp){
		isp = isp;
		var o = { isp : isp, status : status, lat : loc.lat, lng : loc.lng, time : Date.now() };
		map.setIsp(isp);
		map.setLocation(o);
		writeToDatabase(o);
		$('#header').show();
		$('#isp-dropdown-label').text(isp);
	}