function (stopEvent) {
				stopEvent.preventDefault();

				var stopLoc = F5.eventLocation(stopEvent);
				removeEventListener(el, stopEventName(), 'tap');
				removeEventListener(el, moveEventName(), 'tapMove');

				var clickTime = stopEvent.timeStamp - startEvent.timeStamp;
				var clickMove = F5.eventDistance(startLoc, stopLoc);

				// NOTE: not sure why the set timeout is needed. but without, sometimes
				// the event gets delayed. possibly an interaction with animation
				// in any case, the small delay guarantees that touch feedback gets a chance
				// to display
				setTimeout(function () {
					if (pressTime) {
						if (clickTime >= pressTime && clickMove <= F5.maxClickDistance) {
							F5.callback(cb, stopEvent);
						}										
					} else {
						if (clickTime <= F5.maxClickTime && clickMove <= F5.maxClickDistance && !cancel) {
							F5.callback(cb, stopEvent);
						}					
					}									
				}, 30);

				F5.addTapListener(el, cb, pressTime);

			}