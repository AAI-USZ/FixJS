function(isp){
		isp = isp;
		var o = { isp : isp, status : status, lat : loc.lat, lng : loc.lng };
		writeToDatabase(o);
		map.setUserIspAndStatus(isp, status);
		$('#header').show();
		$('#isp-dropdown-label').text(isp);
	}