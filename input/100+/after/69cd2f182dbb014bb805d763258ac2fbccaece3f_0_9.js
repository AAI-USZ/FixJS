function () {
		console.log("removing hooks");
		L.Handler.Draw.prototype.removeHooks.call(this);
		
		if (this._map) {
			if (this._marker) {
				L.DomEvent
				.removeListener(this._marker, 'click', this._onClick)
				.removeListener(this._map, 'click', this._onClick);
				
				if (L.Browser.touch) {
					L.DomEvent
					.removeListener(this._marker, 'touchend', this._onClick);
				}
				this._map.removeLayer(this._marker);
				delete this._marker;
			}

			L.DomEvent.removeListener(this._container, 'mousemove', this._onMouseMove);
			if (L.Browser.touch) {
				L.DomEvent
				.removeListener(this._container, 'touchmove', this._onMouseMove)
				.removeListener(this._container, 'touchend', this._onClick);
			}
		}
	}