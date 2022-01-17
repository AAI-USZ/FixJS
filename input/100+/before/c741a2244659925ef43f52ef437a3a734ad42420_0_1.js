function() {
	 var map = new L.Map('map'),
          tiles = new L.TileLayer('http://a.tiles.mapbox.com/v3/bobbysud.map-94xylfrd/{z}/{x}/{y}.png', {maxZoom: 17}),
          popup = new L.Popup(),
          clientId = 'f62cd3b9e9a54a8fb18f7e122abc52df',
          circle;

      map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);

		map.locateAndSetView();

		function onLocationFound(e) {
			var radius = e.accuracy / 2;

			var marker = new L.Marker(e.latlng);
			map.addLayer(marker);
			marker.bindPopup("You are within " + radius + " meters from this point").openPopup();

			var circle = new L.Circle(e.latlng, radius);
			map.addLayer(circle);
	}





      map.on('click', onMapClick);

		var popup = new L.Popup();
		var marker = new L.Marker();

		function onMapClick(e) {
			var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';

			popup.setLatLng(e.latlng);
			marker.setLatLng(e.latlng);
			popup.setContent("Station Information" + latlngStr);
		
			map.addLayer(marker).openPopup(popup);;
		}




  
      }