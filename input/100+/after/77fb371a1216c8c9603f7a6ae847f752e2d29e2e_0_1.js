function(geolocationData) {
		if (geolocationData.speed >=0) {var speedINkph = geolocationData.speed * (60*60/1000);} else {var speedINkph = -1;} //calculate speed in km/hr

		var formattedData = 'Latitude: '          + geolocationData.coords.latitude          + '<br />' +
							'Longitude: '         + geolocationData.coords.longitude         + '<br />' +
							'Accuracy: '          + geolocationData.coords.accuracy          + '<br />' +
							'Altitude: '          + geolocationData.coords.altitude          + '<br />' +
							'Altitude Accuracy: ' + geolocationData.coords.altitudeAccuracy  + '<br />' +
							'Heading: '           + geolocationData.coords.heading           + '<br />' +
							'Speed: '             + geolocationData.coords.speed + ' || ' + speedINkph + '<br />' +
							'Timestamp: '         + formatDate(geolocationData.timestamp)       + '<br />';
		return formattedData;
	}