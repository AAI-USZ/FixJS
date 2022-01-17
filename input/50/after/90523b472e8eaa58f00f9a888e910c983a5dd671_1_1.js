function(success, error){
		navigator.geolocation.getCurrentPosition(success, error, 
			{enableHighAccuracy: true, timeout: 10000, maximumAge: 6*(10^4)});
		return;
	}