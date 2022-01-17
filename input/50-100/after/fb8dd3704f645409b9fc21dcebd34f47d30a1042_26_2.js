function(e, element) {
			if (Math.abs(this._touchStartLocation.x - e.changedTouches[0].clientX) > this._driftThreshold || 
					Math.abs(this._touchStartLocation.y - e.changedTouches[0].clientY) > this._driftThreshold) {
				this._driftedOutsideThreshold = true;
			}
		}