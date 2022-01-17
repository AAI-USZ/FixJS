function(monuments) {
					$( '#results' ).data( 'monuments', monuments );
					mapFocusNeeded = true;
					showMonumentsMap(monuments, {
						lat: pos.coords.latitude,
						lon: pos.coords.longitude
					}, 10);
				}