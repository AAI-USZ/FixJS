function (type, event) {
			var hasTouches = true,
				rcjsEvent;
			switch (type) {
				case 'touchstart':
					hasTouches = true;
					if (!touches.length) { gestureStartTime = new Date().getTime(); }
					Array.prototype.forEach.call(event.changedTouches, function (touch) {
						touchIds[touch.identifier] = touches.length;
						touches.push( {
							identifier: touch.identifier,
							downTime: new Date().getTime(),
							clientX: touch.clientX,
							clientY: touch.clientY
						} );
					});
					setTimeout(function ( ) {
						if (that.pointerMode && touches.length == 1) {
							currentGesture = 'singletouch';
							self.emitEvent('rcjs:singletouchstart', {
								clientX: event.touches[0].clientX,
								clientY: event.touches[0].clientY
							});
						}
					}, 300); 
					break;
				case 'touchend':
					Array.prototype.forEach.call(event.changedTouches, function (event) {
						touches[touchIds[event.identifier]].upTime = new Date().getTime();	
					});
					hasTouches = event.touches && event.touches.length > 0;
					if (!hasTouches && that.pointerMode) {
						self.emitEvent('rcjs:singletouchend', {		
						});	
					}
					break;
				case 'touchmove':
					if (event.touches.length == 1) { 
						if (currentGesture == 'singletouch') {
							self.emitEvent('rcjs:singletouchmove', {
								clientX: event.touches[0].clientX,
								clientY: event.touches[0].clientY
							});
						}
						break; 
					}

					Array.prototype.forEach.call(event.changedTouches, function (event) {
						var touch = touches[touchIds[event.identifier]]
						touch.lastClientX = event.clientX;
						touch.lastClientY = event.clientY;
					});

					var deltaAB = 0, deltaBC = 0, currentDeltaAB = 0, currentDeltaBC = 0, t = touches;
					if (t[0] && t[1]) {
						deltaAB = dist(t[0].clientX, t[0].clientY, t[1].clientX, t[1].clientY);
						currentDeltaAB = dist(t[0].lastClientX, t[0].lastClientY, t[1].lastClientX, t[1].lastClientY);
					}

					// if (t[1] && t[2]) {
					// 	deltaBC = dist(t[1].clientX, t[1].clientY, t[2].clientX, t[2].clientY);
					// 	currentDeltaBC = dist(t[1].lastClientX, t[1].lastClientY, t[2].lastClientX, t[2].lastClientY);
					// 	console.log(deltaAB);
					// }

					if (Math.abs(deltaAB - currentDeltaAB) < 50 && Math.abs(deltaBC - currentDeltaBC) < 50) {
						var atan2 = Math.atan2((t[0].clientY - t[0].lastClientY),(t[0].clientX - t[0].lastClientX)),
							deg = atan2 * 180 / Math.PI;
						currentGesture = 'rcjs:swipe';
						rcjsEvent = lastEvent = {
							type: 'rcjs:swipe', 
							event: {
								angle: deg
							}
						}
						that.gesture = 'rcjs:swipe';
						//console.log('swipe');
					} else {
						var atan2 = Math.atan2((t[0].clientY - t[0].lastClientY),(t[0].clientX - t[0].lastClientX)),
						 	deg = atan2 * 180 / Math.PI,
						 	scale = 0;
						currentGesture = 'rcjs:pinch';
						rcjsEvent = lastEvent = {
							type: 'rcjs:pinch', 
							event: {
								rotation: deg,
								scale: scale
							} 
						}	
						that.gesture = 'rcjs:pinch';
						//console.log('pinch')
					}
					break;
			}
			if (!hasTouches) {
				if (lastEvent) {
					self.emitEvent(currentGesture + 'end', lastEvent.event);
				}
				touches = [];
				touchIds = {};
				currentGesture = null;
				lastEvent = null;
				that.gesture = null;
			}

			return rcjsEvent;
		}