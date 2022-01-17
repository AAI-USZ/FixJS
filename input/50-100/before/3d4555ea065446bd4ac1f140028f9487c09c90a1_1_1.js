function _initRecurse() {
		if (typeof(elm.myPosition) == 'undefined') {
			initLocation();
			locationTimeout = window.setTimeout(function() { _initRecurse() }, 300);
		} else {
			// init location
			initialLocation = new google.maps.LatLng(elm.myPosition.lat, elm.myPosition.long);

			// init map on window load
			//google.maps.event.addDomListener(window, 'load', _initMap);
			_initMap();
		}
	}