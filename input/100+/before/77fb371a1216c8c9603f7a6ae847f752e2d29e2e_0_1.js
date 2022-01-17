function(geolocationData) {
		if (geolocationData.speed >=0) {var speedINkph = geolocationData.speed * (60*60/1000);} else {var speedINkph = -1;} //calculate speed in km/hr

		var formattedData = 'Latitude: '          + geolocationData.latitude          + '<br />' +
							'Longitude: '         + geolocationData.longitude         + '<br />' +
							'Accuracy: '          + geolocationData.accuracy          + '<br />' +
							'Altitude: '          + geolocationData.altitude          + '<br />' +
							'Altitude Accuracy: ' + geolocationData.altitudeAccuracy  + '<br />' +
							'Heading: '           + geolocationData.heading           + '<br />' +
							'Speed: '             + geolocationData.speed + ' || ' + speedINkph + '<br />' +
							'Timestamp: '         + formatDate(geolocationData.timestamp)       + '<br />';
		return formattedData;
	}