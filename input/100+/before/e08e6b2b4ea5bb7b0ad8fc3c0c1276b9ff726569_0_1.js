function () {
		L.Handler.Draw.prototype.removeHooks.call(this);

		this._cleanUpShape();
		
		// remove markers from map
		this._map.removeLayer(this._markerGroup);
		delete this._markerGroup;
		delete this._markers;

		this._map.removeLayer(this._poly);
		delete this._poly;

		// clean up DOM
		this._clearGuides();
		this._container.style.cursor = '';

		this._map
			.off('mousemove', this._onMouseMove)
			.off('click', this._onClick);
	}