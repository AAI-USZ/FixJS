function (data) {

			if (data.candidates[0]) {

				var x = data.candidates[0].location.x;

				var y = data.candidates[0].location.y;

				var loc = new L.LatLng(y,x);

				var locMarker = new L.Marker(loc, {draggable: true});

					markerGroup.addLayer(locMarker);

					map.addLayer(markerGroup);

					map.setView(loc,16);

				var rad = 350;

					drawCircle(loc);

					getHydrantGeoJSON(loc);

				// listeners for .distance range input and dragging the marker

				locMarker.on('drag', function(e) {

					mrkLatLng = locMarker.getLatLng();

					loc = new L.LatLng(mrkLatLng.lat, mrkLatLng.lng);

					overlayGroup.clearLayers();

					drawCircle(loc);

					var rad = $(".distance").val();

					getHydrantGeoJSON(loc,rad);

				});

				$("#slider").bind("slide", function() {

					overlayGroup.clearLayers();

					drawCircle(loc);

				});

				$("#slider").bind("slidestop", function() {

					var rad = $("#slider").slider("value");

					overlayGroup.clearLayers();

					getHydrantGeoJSON(loc,rad);

					drawCircle(loc);

				});



			} else {

				refreshMap();

				$('#street').val('Address Invalid');

			};//test address and geocode it if a location is returned by the iMap service

		}).error(function() {refreshMap();}