function showMonumentsMap(monuments, center, zoom) {
		geo.init();
		geo.clear();
		if( mapFocusNeeded && typeof center === 'undefined' && typeof zoom === 'undefined' ) {
			var centerAndZoom = geo.calculateCenterAndZoom(monuments);
			center = centerAndZoom.center;
			zoom = centerAndZoom.zoom;
			mapFocusNeeded = false;
		}
		if( center && zoom ) {
			geo.setCenterAndZoom( center, zoom );
		}
		$.each(monuments, function(i, monument) {
			if(monument.lat && monument.lon) {
				geo.addMonument(monument, showMonumentDetail);
			}
		});
	}