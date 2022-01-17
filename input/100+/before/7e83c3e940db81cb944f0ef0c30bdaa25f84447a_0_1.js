function() {
			debug('dragend');
			newPoint = marker.getLatLng();
			set_user_location(newPoint);
            marker_has_been_moved = true;
		}