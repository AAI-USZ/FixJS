function _initRecurse() {
		if (typeof(Elm.myPosition) == 'undefined') {
			initLocation();
			locationTimeout = window.setTimeout(function() {
				_initRecurse()
			}, 300);
		} else {
			// init location
			initialLocation = new google.maps.LatLng(Elm.myPosition.lat, Elm.myPosition.long);
			_initMap();
		}
	}