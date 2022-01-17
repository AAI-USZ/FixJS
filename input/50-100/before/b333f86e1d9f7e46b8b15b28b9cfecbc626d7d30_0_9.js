function (map) {
		this._map = map;

		this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
		L.DomEvent.disableClickPropagation(this._container);

		this._update();

		return this._container;
	}