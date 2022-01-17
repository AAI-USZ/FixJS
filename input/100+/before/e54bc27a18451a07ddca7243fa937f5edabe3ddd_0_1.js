function (center, zoom, centerOffset) {

		if (this._animatingZoom) {
			return true;
		}
		if (!this.options.zoomAnimation) {
			return false;
		}

		var scale = Math.pow(2, zoom - this._zoom),
			offset = centerOffset.divideBy(1 - 1 / scale);

		// if offset does not exceed half of the view
		if (!this._offsetIsWithinView(offset, 1)) {
			return false;
		}

		this._mapPane.className += ' leaflet-zoom-anim';

        this
			.fire('movestart')
			.fire('zoomstart');

		this._prepareTileBg();

		var centerPoint = this.containerPointToLayerPoint(this.getSize().divideBy(2)),
			origin = centerPoint.add(offset);

		this._runAnimation(center, zoom, scale, origin);

		return true;
	}