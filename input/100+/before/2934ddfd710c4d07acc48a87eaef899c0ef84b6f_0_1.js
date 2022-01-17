function () {
		this._errorShown = true;

		// Update label
		L.DomUtil.addClass(this._label, 'leaflet-error-draw-label');
		L.DomUtil.addClass(this._label, 'leaflet-flash-anim');
		L.Handler.Draw.prototype._updateLabelText.call(this, { text: this.options.drawError.message });

		// Update shape
		L.DomUtil.addClass(this._guidesContainer, 'leaflet-draw-error-guide-dash');
		this._poly.setStyle({ color: this.options.drawError.color });

		// Hide the error after 2 seconds
		this._clearHideErrorTimeout();
		this._hideErrorTimeout = setTimeout(L.Util.bind(this._hideErrorLabel, this), 3000);
	}