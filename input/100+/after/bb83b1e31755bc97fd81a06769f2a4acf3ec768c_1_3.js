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
							clientY: touch.clientY,
							lastClientX: touch.clientX,
							lastClientY: touch.clientY
						} );
					});
					setTimeout(function ( ) {
						if (currentGesture) {
								return;
						}

						if (that.pointerMode && touches.length === 1) {
							currentGesture = 'rcjs:singletouch';
							self.emitEvent('rcjs:singletouchstart', {
								clientX: event.touches[0].clientX,
								clientY: event.touches[0].clientY
							});
						} else if (touches.length === 2) { 
							var t = touches;
							var deltaAB = dist(t[0].clientX, t[0].clientY, t[1].clientX, t[1].clientY);
							if (deltaAB < 80) {
								currentGesture = 'rcjs:swipe';
								self.emitEvent('rcjs:swipestart', {
									rotation: deg
								});
							} else {
								currentGesture = 'rcjs:pinch';
								var atan2 = Math.atan2((t[0].lastClientY - t[1].lastClientY),(t[0].lastClientX - t[1].lastClientX)),
							 		deg = atan2 * 180 / Math.PI;
								t[0].rotation = deg;
								self.emitEvent('rcjs:pinchstart', {
									rotation: deg
								});
							}
						}
					}, 200); 
					break;
				case 'touchend':
					Array.prototype.forEach.call(event.changedTouches, function (event) {
						if (touchIds[event.identifier]) {
							touches[touchIds[event.identifier]].upTime = new Date().getTime();	
						}
					});
					hasTouches = event.touches && event.touches.length > 0;
					var time = new Date().getTime();
					if (!hasTouches && time - gestureStartTime < 100) {
						if (lastTap) {
							if (time - lastTap < 200) {
								self.emitEvent('rcjs:doubletap', {});
								delete lastTap;
							}
						} else {
							self.emitEvent('rcjs:singletap', {
								clientX: event.clientX,
								clientY: event.clientY
							});	
							lastTap = time;
						}
					} else if (!hasTouches && that.pointerMode) {
						if (currentGesture == 'rcjs:singletouch')
						self.emitEvent('rcjs:singletouchend', {});	
					}
					break;
				case 'touchmove':
					Array.prototype.forEach.call(event.changedTouches, function (event) {
						var touch = touches[touchIds[event.identifier]]
						touch.lastClientX = event.clientX;
						touch.lastClientY = event.clientY;
					});

					if (event.touches.length == 1) { 
						if (currentGesture == 'rcjs:singletouch') {
							self.emitEvent('rcjs:singletouchmove', {
								clientX: event.touches[0].clientX,
								clientY: event.touches[0].clientY
							});
						}
						break; 
					} else {
						var deltaAB = 0, deltaBC = 0, currentDeltaAB = 0, currentDeltaBC = 0, t = touches;
						if (t[0] && t[1]) {
							deltaAB = dist(t[0].clientX, t[0].clientY, t[1].clientX, t[1].clientY);
							currentDeltaAB = dist(t[0].lastClientX, t[0].lastClientY, t[1].lastClientX, t[1].lastClientY);
						}

						if (currentGesture == 'rcjs:swipe') {
							var distance = dist(t[0].clientX, t[0].clientY, t[0].lastClientX, t[0].lastClientY),
								atan2 = Math.atan2((t[0].clientY - t[0].lastClientY),(t[0].clientX - t[0].lastClientX)),
							 	deg = atan2 * 180 / Math.PI;
							rcjsEvent = lastEvent = {
								type: 'rcjs:swipe', 
								event: {
									distance: distance,
									angle: deg
								} 
							}	
						} else if (currentGesture == 'rcjs:pinch') {
							var t = touches,
								atan2 = Math.atan2((t[0].lastClientY - t[1].lastClientY),(t[0].lastClientX - t[1].lastClientX)),
							 	deg = atan2 * 180 / Math.PI,
							 	startDist = dist(t[0].clientX, t[0].clientY, t[1].clientX, t[1].clientY),
							 	currentDist = dist(t[0].lastClientX, t[0].lastClientY, t[1].lastClientX, t[1].lastClientY),
							 	scale = currentDist / startDist ;
							rcjsEvent = lastEvent = {
								type: 'rcjs:pinch', 
								event: {
									rotation: deg - t[0].rotation,
									scale: scale
								} 
							}	
						}
						break;
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
			}

			return rcjsEvent;
		}