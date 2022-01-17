function () {
		if (this._map) {
			this._map._popup = null;
			this._map.removeLayer(this);
		}
	}