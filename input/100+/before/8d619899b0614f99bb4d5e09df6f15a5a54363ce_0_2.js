function (opt) {
		// TODO refactor into something more manageable
		var centerOffset = this._getNewTopLeftPoint(opt.center).subtract(this._getTopLeftPoint()),
			scale = Math.pow(2, opt.zoom - this._zoom),
			offset = centerOffset.divideBy(1 - 1 / scale),
			centerPoint = this.containerPointToLayerPoint(this.getSize().divideBy(-2)),
			origin = centerPoint.add(offset).round(),
			pathRootStyle = this._pathRoot.style;

		pathRootStyle[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString((origin.multiplyBy(-1).add(L.DomUtil.getPosition(this._pathRoot)).multiplyBy(scale).add(origin))) + ' scale(' + scale + ') ';

		this._pathZooming = true;
	}