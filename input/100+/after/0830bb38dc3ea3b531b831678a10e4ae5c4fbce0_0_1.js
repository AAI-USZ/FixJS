function (opt) {
		var image = this._image,
		    scale = Math.pow(2, opt.zoom - this._map._zoom),
		    topLeft = this._map._latLngToNewLayerPoint(this._bounds.getNorthWest(), opt.zoom, opt.center),
		    size = this._map._latLngToNewLayerPoint(this._bounds.getSouthEast(), opt.zoom, opt.center).subtract(topLeft),
		    currentSize = this._map.latLngToLayerPoint(this._bounds.getSouthEast()).subtract(this._map.latLngToLayerPoint(this._bounds.getNorthWest()));

		image.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(topLeft.add(size.subtract(currentSize).divideBy(2))) + ' scale(' + scale + ') ';
	}