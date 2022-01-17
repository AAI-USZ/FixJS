function()
{	

	var _lat, _lng, _city, _state, _onComplete;

	Object.defineProperty(this, "lat",			{ get: function() {return _lat;} 	});
	Object.defineProperty(this, "lng",			{ get: function() {return _lng;} 	});
	Object.defineProperty(this, "city",			{ get: function() {return _city;} 	});
	Object.defineProperty(this, "state",		{ get: function() {return _state;}	});
	
	this.getLocation = function(callback)
	{
		_onComplete = callback;
		if (!navigator.geolocation){
			_onComplete(false, 'Your browser does not support geolocation :(');
		}	else{
			navigator.geolocation.watchPosition(getGeoCodeData, onPositionError, { enableHighAccuracy: true, maximumAge:30000, timeout:27000 });
		}
	}

	var getGeoCodeData = function(pos)
	{
		_lat = pos.coords.latitude;
		_lng = pos.coords.longitude;
	//	console.log('onGeoData', pos.coords.accuracy, pos.coords.speed, pos.coords.altitude, pos.coords.altitudeAccuracy);
		var coder = new google.maps.Geocoder();
		var point = new google.maps.LatLng(_lat, _lng);
		if (coder) {
			coder.geocode({'latLng': point }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var a = results[0];
						for (var i = a.address_components.length - 1; i >= 0; i--){
							var n = a.address_components[i];
							if (n['types'][0] == 'administrative_area_level_1') _state = n['long_name'];
							if (n['types'][0] == 'administrative_area_level_3') _city = n['long_name'];
							if (n['types'][0] == 'administrative_area_level_2' && !_city) _city = n['long_name'];
						};
						_onComplete(true);
					} else {
						_onComplete(false, 'Unable to reverse geocode location');
					}
				} else {
					_onComplete(false, 'Geocoder failed due to: ' + status);
				}
			});
		}
	}

	var onPositionError = function(e)
	{
		var msg;
		switch(e.code) {
		case e.PERMISSION_DENIED:
			msg = "Permission was denied";			break;
		case e.POSITION_UNAVAILABLE:
			msg = "Location data not available";	break;
		case e.TIMEOUT:
			msg = "Location request timeout";		break;
		case e.UNKNOWN_ERROR:
			msg = "An unspecified error occurred";	break;
		default:
			msg = "An unspecified error occurred";	break;
		}
		_onComplete(false, msg);
	}
	
}