function () {
		var text;
		if (this._markers.length === 0) {
			text = 'Tap to start drawing shape.';
		} else if (this._markers.length < 3) {
			text = 'Tap to continue drawing shape.';
		} else {
			text = 'Tap first point to close this shape.';
		}
		return {
			text: text
		};
	}