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

		if (this._tileBg)
			console.log("bg : " + this._getLoadedTilesPercentage(this._tileBg) + ", fg: " + this._getLoadedTilesPercentage(this._tilePane));
		//Foreground layer doesn't have many tiles but bg layer does, keep the existing bg layer
		if (this._tileBg && this._getLoadedTilesPercentage(this._tileBg) > 0.5 && this._getLoadedTilesPercentage(this._tilePane) < 0.5) { //fg isn't very loaded and BG is
			//Leave current bg and just zoom it some more
			console.log("Skipping");

			this._tilePane.style.visibility = 'hidden';
			this._tilePane.empty = true;
			this._stopLoadingImages(this._tilePane);
			this._stopLoadingImages(this._tileBg);
		} else {
			this._prepareTileBg();
		}

		var centerPoint = this.containerPointToLayerPoint(this.getSize().divideBy(2)),
			origin = centerPoint.add(offset);

		this._runAnimation(center, zoom, scale, origin);

		return true;
	}