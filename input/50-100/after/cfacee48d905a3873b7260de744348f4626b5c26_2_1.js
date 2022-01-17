function(callback)
	{
		_onComplete = callback;
		if (!navigator.geolocation){
			_onComplete(false, 'Your browser does not support geolocation :(');
		}	else{
			navigator.geolocation.watchPosition(getGeoCodeData, onPositionError, { enableHighAccuracy: true, maximumAge:30000, timeout:27000 });
		}
	}