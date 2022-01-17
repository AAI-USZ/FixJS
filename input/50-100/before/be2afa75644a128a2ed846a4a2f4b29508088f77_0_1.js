function(status, isp){
		onIspSelected(isp);
		map.setUserIspAndStatus(isp, status);
		writeToDatabase({ isp : isp, status : status, lat : loc.lat, lng : loc.lng });
		$('#header').show();
	}