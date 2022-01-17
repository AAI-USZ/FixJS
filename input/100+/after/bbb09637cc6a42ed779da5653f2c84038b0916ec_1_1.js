function(movement){
			var marker = me.userMarkers[movement.user.id];
			var position = new google.maps.LatLng(movement.location.lat, movement.location.lon)
			if (!marker) {
				marker = new google.maps.Marker({
					position:position,
					map:me.map,
					title:movement.user.name,
					icon:'img/map_pin.png'
				});
				me.userMarkers[movement.user.id] = marker;
			} else {
				marker.setPosition(position);
			}
		}