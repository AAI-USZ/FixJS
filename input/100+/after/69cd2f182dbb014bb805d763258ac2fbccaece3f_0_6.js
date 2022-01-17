function () {
		L.Handler.Draw.prototype.addHooks.call(this);
		if (this._map) {
			this._map.dragging.disable();
			//TODO refactor: move cursor to styles
			this._container.style.cursor = 'crosshair';

			this._updateLabelText({
				text: this._initialLabelText
			});

			L.DomEvent
			.addListener(this._container, 'mousedown', this._onMouseDown, this)
			.addListener(document, 'mousemove', this._onMouseMove, this);
				
			if (L.Browser.touch) {
				L.DomEvent
				.addListener(this._container, 'touchstart', this._onMouseDown, this)
				.addListener(document, 'touchmove', this._onMouseMove, this);
			}
		}
	}