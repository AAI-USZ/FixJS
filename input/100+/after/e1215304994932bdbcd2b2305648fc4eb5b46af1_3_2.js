function (e) {
		var latlng = this._map.mouseEventToLatLng(e.changedTouches ? e.changedTouches[0] : e);
		
		if (e.touches) {
			this._clearGuides();
			// The touchend on the container seems to have preference over the touchend on the marker, so we manually check position of the last marker.
			// This also gives us the opportunity to use a touch target a little bigger than the visual shape, which makes it easier to hit the marker with clumsy fingers
			if (this._clickedFinishMarker(latlng)) {
				this._finishShape();
				return true;
			}
			
		}

		this._markers.push(this._createMarker(latlng));

		this._poly.addLatLng(latlng);

		if (this._poly.getLatLngs().length === 2) {
			this._map.addLayer(this._poly);
		}

		this._updateMarkerHandler();

		this._vertexAdded(latlng);
	}