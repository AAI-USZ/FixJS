function (opt) {
		var map = this._map,
			image = this._image,
		    scale = map.getZoomScale(opt.zoom),
		    nw = this._bounds.getNorthWest(),
		    se = this._bounds.getSouthEast(),
		    topLeft = map._latLngToNewLayerPoint(nw, opt.zoom, opt.center),
		    size = map._latLngToNewLayerPoint(se, opt.zoom, opt.center).subtract(topLeft),
		    currentSize = map.latLngToLayerPoint(se).subtract(map.latLngToLayerPoint(nw)),
		    origin = topLeft.add(size.subtract(currentSize).divideBy(2));

		image.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(origin) + ' scale(' + scale + ') ';
	}