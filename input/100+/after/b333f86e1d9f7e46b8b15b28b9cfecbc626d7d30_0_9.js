function (e) {
		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

		L.DomUtil.disableTextSelection();

		this._startLayerPoint = this._map.mouseEventToLayerPoint(e);

		this._box = L.DomUtil.create('div', 'leaflet-zoom-box', this._pane);
		L.DomUtil.setPosition(this._box, this._startLayerPoint);

		//TODO refactor: move cursor to styles
		this._container.style.cursor = 'crosshair';

		L.DomEvent
			.addListener(document, 'mousemove', this._onMouseMove, this)
			.addListener(document, 'mouseup', this._onMouseUp, this)
			.preventDefault(e);
			
		this._map.fire("boxzoomstart");
	}