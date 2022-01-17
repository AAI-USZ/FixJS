function (e) {
		this._map.fire(
			'draw:marker-created',
			{ marker: new L.Marker(this._marker.getLatLng(), this.options.icon) }
		);
		this.disable();
	}