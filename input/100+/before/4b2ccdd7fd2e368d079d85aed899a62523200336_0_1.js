function () {
		var bounds = this._map.getBounds(),
		    centerLat = bounds.getCenter().lat,

		    left = new L.LatLng(centerLat, bounds.getSouthWest().lng),
		    right = new L.LatLng(centerLat, bounds.getNorthEast().lng),

		    size = this._map.getSize(),
		    options = this.options,

		    maxMeters = left.distanceTo(right) * (options.maxWidth / size.x);

		if (options.metric) {
			this._updateMetric(maxMeters);
		}

		if (options.imperial) {
			this._updateImperial(maxMeters);
		}
	}