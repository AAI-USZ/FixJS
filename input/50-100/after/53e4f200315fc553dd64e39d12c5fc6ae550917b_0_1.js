function addMonument(monument, onClick) {
		var marker = new L.Marker(new L.LatLng(monument.lat, monument.lon));
		var popup = "<div><strong>" + monument.name + "</strong></div>";
		var popupDOM = $(popup).click(function() {
			onClick(monument);
		})[0];
		marker.bindPopup(popupDOM, {closeButton: false});
		clusterer.addMarker( marker );
	}