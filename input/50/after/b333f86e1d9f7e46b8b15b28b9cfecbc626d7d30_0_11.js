function () {
		var map = this._map;

		if (map) {
			map._popup = null;

			map
				.removeLayer(this)
				.fire('popupclose', {popup: this});
		}
	}