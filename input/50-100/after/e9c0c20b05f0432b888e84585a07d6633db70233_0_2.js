function () {
		this._errorShown = false;

		this._clearHideErrorTimeout();
		
		// Revert label
		L.DomUtil.removeClass(this._label, 'leaflet-error-draw-label');
		L.DomUtil.removeClass(this._label, 'leaflet-flash-anim');
		this._updateLabelText(this._getLabelText());

		// Revert shape
		this._updateGuideColor(this.options.shapeOptions.color);
		this._poly.setStyle({ color: this.options.shapeOptions.color });
	}