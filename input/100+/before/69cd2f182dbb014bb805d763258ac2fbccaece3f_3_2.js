function () {
		L.Handler.Draw.prototype.removeHooks.call(this);
		
		if (this._map) {
			if (this._marker) {
				L.DomEvent
					.removeListener(this._marker, 'click', this._onClick)
					.removeListener(this._marker, 'touchstart', this._onClick)
					.removeListener(this._map, 'click', this._onClick)
					.removeListener(this._map, 'touchstart', this._onClick);
				this._map.removeLayer(this._marker);
				delete this._marker;
			}

			L.DomEvent.removeListener(this._container, 'mousemove', this._onMouseMove);
			L.DomEvent.removeListener(this._container, 'touchmove', this._onMouseMove);
		}
	}