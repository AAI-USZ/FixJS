function(callback)
	{
		_onComplete = callback;
		if (!navigator.geolocation){
			_onComplete(false, 'Your browser does not support geolocation :(');
		}	else{
			navigator.geolocation.getCurrentPosition(getGeoCodeData, onPositionError);
		}
	}