function (currentLatLng) {
		var labelText,
			distance,
			distanceStr;

		if (this._markers.length === 0) {
			labelText = {
				text: 'Tap to start drawing line.'
			};
		} else {
			// calculate the distance from the last fixed point to the mouse position
			distance = this._measurementRunningTotal + currentLatLng.distanceTo(this._markers[this._markers.length - 1].getLatLng());
			// show metres when distance is < 1km, then show km
			distanceStr = distance  > 1000 ? (distance  / 1000).toFixed(2) + ' km' : Math.ceil(distance) + ' m';
			
			if (this._markers.length === 1) {
				labelText = {
					text: 'Tap to continue drawing line.',
					subtext: distanceStr
				};
			} else {
				labelText = {
					text: 'Tap last point to finish line.',
					subtext: distanceStr
				};
			}
		}
		return labelText;
	}