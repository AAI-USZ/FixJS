function () {
		L.Handler.Draw.prototype.addHooks.call(this);
		//this._marker = null;
		if (this._map) {
			this._updateLabelText({
				text: (L.Browser.touch ? 'Tap' : 'Click') + ' map to place marker.'
			});
			L.DomEvent.addListener(this._container, 'mousemove', this._onMouseMove, this);
			if (L.Browser.touch) {
				L.DomEvent.addListener(this._container, 'touchmove', this._onMouseMove, this);
				L.DomEvent.addListener(this._container, 'touchend', this._onClick, this);
			}
		}
	}