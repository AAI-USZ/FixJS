function ( ) {
						if (that.pointerMode && touches.length == 1) {
							currentGesture = 'singletouch';
							self.emitEvent('rcjs:singletouchstart', {
								clientX: event.touches[0].clientX,
								clientY: event.touches[0].clientY
							});
						}
					}