function (e) {
		var newPos = this._map.mouseEventToLayerPoint(e),
			latlng = this._map.mouseEventToLatLng(e),
			markerCount = this._markers.length;

		// update the label
		this._updateLabelPosition(newPos);

		if (markerCount > 0) {
			this._updateLabelText(this._getLabelText(latlng));
			// draw the guide line
			this._clearGuides();
			this._drawGuide(
				this._map.latLngToLayerPoint(this._markers[markerCount - 1].getLatLng()),
				newPos
			);
		}

		L.DomEvent.preventDefault(e);
	}