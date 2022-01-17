function(i, location) {
			var latlng = new google.maps.LatLng(location.latitude, location.longitude);
			var address = location.formattedAddress;
			var neighborhood = location.neighborhood;
			
		    // sidebar item
			var link = jQuery("<a href='#" + location.latitude + "%2C" + location.longitude + "'></a>")
							.text(address);

			var listItem = jQuery("<li></li>")
							.addClass("locationItem")
							.css("background-image", "url('img/location/location_" + (i + 1) + ".png')")
							.append(link);

			resultsList.append(listItem);

			// marker
			var marker = routeMap.addDisambiguationMarker(latlng, address, neighborhood, (i + 1));			

			listItem.hover(function() {
				routeMap.highlightDisambiguationMarker(marker, (i + 1));
				listItem.css("background-image", "url('img/location/location_active_sidebar_" + (i + 1) + ".png')");
			}, function() {
				routeMap.unhighlightDisambiguationMarker(marker, (i + 1));
				listItem.css("background-image", "url('img/location/location_" + (i + 1) + ".png')");
			});

			// calculate extent of all options
			if(bounds === null) {
				bounds = new google.maps.LatLngBounds(latlng, latlng);
			} else {
				bounds.extend(latlng);
			}
		}