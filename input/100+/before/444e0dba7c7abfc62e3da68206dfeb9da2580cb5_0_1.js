function () {
		var bounds = this._map.getBounds(),
		    centerLat = bounds.getCenter().lat,

		    left = new L.LatLng(centerLat, bounds.getSouthWest().lng),
		    right = new L.LatLng(centerLat, bounds.getNorthEast().lng),

		    size = this._map.getSize(),
		    options = this.options,
                    maxMeters = 0;

		if (size.x > 0) {
			maxMeters = left.distanceTo(right) * (options.maxWidth / size.x);
		}

		if (options.metric && maxMeters) {
			this._updateMetric(maxMeters);
		}

		if (options.imperial && maxMeters) {
			this._updateImperial(maxMeters);
		}
	}