function () {
		var text;
		if (this._markers.length === 0) {
			text = (L.Browser.touch ? 'Tap' : 'Click') + ' to start drawing shape.';
		} else if (this._markers.length < 3) {
			text = (L.Browser.touch ? 'Tap' : 'Click') + ' to continue drawing shape.';
		} else {
			text = (L.Browser.touch ? 'Tap' : 'Click') + ' first point to close this shape.';
		}
		return {
			text: text
		};
	}