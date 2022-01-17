function(pos) {
				$("#results").empty();
				userLocation = pos;
				currentSortMethod = 'distance';
				$( 'html' ).addClass( 'locationAvailable' );
				var d = monuments.getInBoundingBox(pos.coords.longitude - nearbyDeg,
					pos.coords.latitude - nearbyDeg,
					pos.coords.longitude + nearbyDeg,
					pos.coords.latitude + nearbyDeg
				).done(function(monuments) {
					$( '#results' ).data( 'monuments', monuments );
					mapFocusNeeded = true;
					showMonumentsMap(monuments, {
						lat: pos.coords.latitude,
						lon: pos.coords.longitude
					}, 10);
				});
				showPage( 'map-page', d );
			}