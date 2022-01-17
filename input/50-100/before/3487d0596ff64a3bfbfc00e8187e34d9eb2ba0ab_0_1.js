function(event) {
			var ua = navigator.userAgent.toLowerCase(),
				boolIsMac = false;
			if (ua.indexOf("mac") > -1) {
				boolIsMac = true;
			}
			if (event.keyCode === 16) {
				// Shift key has been pressed
				this._isShiftPressed = true;
			}
			if ((event.keyCode === 17) && !boolIsMac) {
				// Control key has been pressed
				this._isControlPressed = true;
			}
			if (event.metaKey === true) {
				this._isControlPressed = true;
			}
		}