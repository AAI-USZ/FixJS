function (opt) {
		var scale = this.getZoomScale(opt.zoom),
			offset = this._getCenterOffset(opt.center).divideBy(1 - 1 / scale),
			viewportPos = this.containerPointToLayerPoint(this.getSize().multiplyBy(-L.Path.CLIP_PADDING)),
			origin = viewportPos.add(offset).round();

		this._pathRoot.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString((origin.multiplyBy(-1).add(L.DomUtil.getPosition(this._pathRoot)).multiplyBy(scale).add(origin))) + ' scale(' + scale + ') ';

		this._pathZooming = true;
	}