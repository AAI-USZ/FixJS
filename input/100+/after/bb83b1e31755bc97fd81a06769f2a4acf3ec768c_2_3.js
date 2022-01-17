function copyEvent (event) {
		var type = event.type, copy;
		switch (type) {
			case 'touchstart' :
			case 'touchmove' :
			case 'touchend' :
				copy = {
					changedTouches: copyTouchEvents(event, 'changedTouches'),
					targetTouches: copyTouchEvents(event, 'targetTouches'),
					touches: copyTouchEvents(event, 'touches')
				}
				break;
			case 'mousedown' :
			case 'mouseup' :
			case 'mousemove' :
				copy = {
					// XXX Decide which to take
					clientX: event.clientX,
					clientY: event.clientY,
					pageX: event.pageX,
					pageY: event.pageY
				}
				break;
			case 'deviceorientation' :
				// http://www.w3.org/TR/orientation-event/#deviceorientation
				copy = {
					alpha: event.alpha,
					beta: event.beta,
					gamma: event.gamma,
					deviceOrientation: window.orientation
				}
				break;x
			// http://www.w3.org/TR/orientation-event/#devicemotion
			case 'devicemotion' :
				copy = {
					acceleration: event.acceleration,
					accelerationIncludingGravity: event.accelerationIncludingGravity,
					rotationRate: event.rotationRate
				}
		}
		copy.type = type;
		return copy;
	}