function () {
		var bounds = new L.LatLngBounds();
		this._iterateLayers(function (layer) {
			bounds.extend(layer instanceof L.Marker ? layer.getLatLng() : layer.getBounds());
		}, this);
		return bounds;
	}