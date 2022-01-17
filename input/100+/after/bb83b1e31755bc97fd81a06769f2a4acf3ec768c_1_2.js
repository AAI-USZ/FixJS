function ( ) {
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
					}