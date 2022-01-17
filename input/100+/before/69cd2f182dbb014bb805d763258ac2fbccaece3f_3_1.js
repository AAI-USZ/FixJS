function () {
		L.Handler.Draw.prototype.addHooks.call(this);
		
		if (this._map) {
			this._updateLabelText({ text: 'Click or tap map to place marker.' });
			L.DomEvent.addListener(this._container, 'mousemove', this._onMouseMove, this);
			L.DomEvent.addListener(this._container, 'touchmove', this._onMouseMove, this);
		}
	}