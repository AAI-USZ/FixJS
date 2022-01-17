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

		//Hack: Disable this for android due to it not supporting double translate (mentioned in _runAnimation below)
		//if Foreground layer doesn't have many tiles but bg layer does, keep the existing bg layer
		if (!L.Browser.android && this._tileBg && this._getLoadedTilesPercentage(this._tileBg) > 0.5 && this._getLoadedTilesPercentage(this._tilePane) < 0.5) {
			//Leave current bg and just zoom it some more

			this._tilePane.style.visibility = 'hidden';
			this._tilePane.empty = true;
			this._stopLoadingImages(this._tilePane);
		} else {
			this._prepareTileBg();
		}

		var centerPoint = this.containerPointToLayerPoint(this.getSize().divideBy(2)),
			origin = centerPoint.add(offset);

		this._runAnimation(center, zoom, scale, origin);

		return true;
	}