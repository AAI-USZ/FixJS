function (e) {
		var latlng = this._map.mouseEventToLatLng(e.touches ? e.touches[0] : e);

		this._markers.push(this._createMarker(latlng));

		this._poly.addLatLng(latlng);

		if (this._poly.getLatLngs().length === 2) {
			this._map.addLayer(this._poly);
		}

		this._updateMarkerHandler();

		this._vertexAdded(latlng);
	}