function showMonumentsMap( monumentList, center, zoom ) {
		var searchTimeout, lastRequest;
		function addMonuments( monuments ) {
			$.each( monuments, function( i, monument ) {
				if ( monument.lat && monument.lon ) {
					geo.addMonument( monument, showMonumentDetail );
				}
			} );
		}
		function ping( ev ) {
			console.log( 'update map with new monuments' );
			var pos = ev.target.getBounds(),
				nw = pos.getNorthWest(),
				se = pos.getSouthEast();
			if( lastRequest ) {
				lastRequest.abort();
			}
			window.clearTimeout( searchTimeout );
			searchTimeout = window.setTimeout( function() {
				lastRequest = monuments.getInBoundingBox( nw.lng, se.lat, se.lng, nw.lat ).done( function( monuments ) {
					if ( monuments.length > 0 ) {
						geo.clear();
						addMonuments( monuments );
						$( '#results' ).data( 'monuments', monuments );
					}
				}, 500 ); // delaying search to prevent stressing out server
			} );
		}
		geo.init( ping );
		geo.clear();
		if( mapFocusNeeded && typeof center === 'undefined' && typeof zoom === 'undefined' ) {
			var centerAndZoom = geo.calculateCenterAndZoom( monumentList );
			center = centerAndZoom.center;
			zoom = centerAndZoom.zoom;
			mapFocusNeeded = false;
		}
		if( center && zoom ) {
			geo.setCenterAndZoom( center, zoom );
		}
		addMonuments( monumentList );
	}