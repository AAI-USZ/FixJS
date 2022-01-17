function() {
var map = new L.Map('map');

		var cloudmadeUrl = 'http://a.tiles.mapbox.com/v3/bobbysud.map-94xylfrd/{z}/{x}/{y}.png',
			cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
			cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});

		map.addLayer(cloudmade);

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

		function onLocationError(e) {
			alert(e.message);
		}

		function onLocationError(e) {
			map.setView(new L.LatLng(37.8043637, -122.2711137), 13).addLayer(tiles);
		}



	}