function () {
		L.Handler.Draw.prototype.addHooks.call(this);
		if (this._map) {
			this._markers = [];

			this._markerGroup = new L.LayerGroup();
			this._map.addLayer(this._markerGroup);

			this._poly = new L.Polyline([], this.options.shapeOptions);

			//TODO refactor: move cursor to styles
			this._container.style.cursor = 'crosshair';

			this._updateLabelText(this._getLabelText());

			L.DomEvent
			.addListener(this._container, 'mousemove', this._onMouseMove, this)
			.addListener(this._container, 'click', this._onClick, this);
				
			if (L.Browser.touch) {
				L.DomEvent
				.addListener(this._container, 'touchstart', this._onMouseMove, this)
				.addListener(this._container, 'touchmove', this._onMouseMove, this)
				.addListener(this._container, 'touchend', this._onClick, this);
			}
		}
	}