function (layer) {
		var events = ['click', 'dblclick', 'mouseover', 'mouseout'],
			i, len;

		for (i = 0, len = events.length; i < len; i++) {
			layer.on(events[i], this._propagateEvent, this);
		}
	}