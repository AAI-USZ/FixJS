function (el, cb, pressTime) {		
		addEventListener(el, startEventName(), function (startEvent) {	
			var cancel = false;

			startEvent.preventDefault();

			var startLoc = F5.eventLocation(startEvent);
			removeEventListener(el, startEventName(), 'tap');

			addEventListener(el, moveEventName(), function (moveEvent) {
				var moveLoc = F5.eventLocation(moveEvent);				
				var moveDistance = F5.eventDistance(startLoc, moveLoc);
				if (moveDistance > F5.maxClickDistance) {
					cancel = true;
				}
			}, false, 'tapMove');

			addEventListener(el, stopEventName(), function (stopEvent) {
				stopEvent.preventDefault();

				var stopLoc = F5.eventLocation(stopEvent);
				removeEventListener(el, stopEventName(), 'tap');
				removeEventListener(el, moveEventName(), 'tapMove');

				var clickTime = stopEvent.timeStamp - startEvent.timeStamp;
				var clickMove = F5.eventDistance(startLoc, stopLoc);

				if (pressTime) {
					if (clickTime >= pressTime && clickMove <= F5.maxClickDistance) {
						F5.callback(cb, stopEvent);
					}										
				} else {
					if (clickTime <= F5.maxClickTime && clickMove <= F5.maxClickDistance && !cancel) {
						F5.callback(cb, stopEvent);
					}					
				}				

				F5.addTapListener(el, cb, pressTime);

			}, false, 'tap');
		}, false, 'tap');
	}