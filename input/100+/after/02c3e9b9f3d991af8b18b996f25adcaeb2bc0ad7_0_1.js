function (e) {
		// Default action on marker click is to remove that marker, but if we remove the marker when latlng count < 3, we don't have a valid polyline anymore
		if (this._poly._latlngs.length < 3) {
			return;
		}
		
		var marker = e.target,
		    i = marker._index;
		
		// Check existence of previous and next markers since they wouldn't exist for edge points on the polyline
		if (marker._prev && marker._next) {
			this._createMiddleMarker(marker._prev, marker._next);
			this._updatePrevNext(marker._prev, marker._next);
		}

		// The marker itself is guaranteed to exist and present in the layer, since we managed to click on it
		this._markerGroup.removeLayer(marker);
		// Check for the existence of middle left or middle right
		if (marker._middleLeft) {
			this._markerGroup.removeLayer(marker._middleLeft);
		}
		if (marker._middleRight) {
			this._markerGroup.removeLayer(marker._middleRight);
		}
		this._markers.splice(i, 1);
		this._poly.spliceLatLngs(i, 1);
		this._updateIndexes(i, -1);
		this._poly.fire('edit');
	}