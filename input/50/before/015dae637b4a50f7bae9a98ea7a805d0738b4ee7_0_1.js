function(monuments) {
					showMonumentsList(monuments);
					showMonumentsMap(monuments, {
						lat: pos.coords.latitude,
						lon: pos.coords.longitude
					}, 10);
				}