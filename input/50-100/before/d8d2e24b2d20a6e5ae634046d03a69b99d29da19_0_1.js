function (canvas, tilePoint, zoom) {
		var ctx = {
			canvas: canvas,
			tile: tilePoint,
			zoom: zoom
		};

		if (this.options.debug) {
			this._drawDebugInfo(ctx);
		}
		this._draw(ctx);
	}