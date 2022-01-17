function (center, zoom) {

		if (this._animatingZoom) { return true; }
		if (!this.options.zoomAnimation) { return false; }

		var scale = this.getZoomScale(zoom),
			offset = this._getCenterOffset(center).divideBy(1 - 1 / scale);

		// if offset does not exceed half of the view
		if (!this._offsetIsWithinView(offset, 1)) { return false; }

		this._mapPane.className += ' leaflet-zoom-anim';

		this
			.fire('movestart')
			.fire('zoomstart');

		this._prepareTileBg();

		this.fire('zoomanim', {
			center: center,
			zoom: zoom
		});

		var origin = this._getCenterLayerPoint().add(offset);

		this._runAnimation(center, zoom, scale, origin);

		return true;
	}