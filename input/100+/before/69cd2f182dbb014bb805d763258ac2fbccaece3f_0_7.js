function (e) {
		this._isDrawing = true;
		
		this._updateLabelText({ text: 'Release mouse to finish drawing.' });

		this._startLatLng = this._map.mouseEventToLatLng(e);

		L.DomEvent
			.addListener(document, 'mouseup', this._onMouseUp, this)
			.addListener(document, 'touchend', this._onMouseUp, this)
			.preventDefault(e);
	}