function RemoteControl (options) {
	var options = options || {},
		host = options.host,
		port = options.port,
		socket = io.connect(host + ':' + port),
		self = this;
	this.key = null; // supplied by server on successful peering
	this.captureEvents = []; // supplied by receiver
	this.events = {};	// required for the EventHandler 'mixin'
	this.showTouches = options.showTouches || false;
	this.deviceEventInterval = options.deviceEventInterval || 200;
	this.token = null;

	socket.on('connect', function () {
		self.emitEvent('rcjs:connected');

		socket.on('rcjs:startCapture', function (data) {
			self.key = data.key;
			capture(true, data.events);
			self.emitEvent('rcjs:startCapture');
		});

		socket.on('rcjs:receiverDisconnect', function (data) {
			capture(false);
			self.emitEvent('rcjs:receiverDisconnect');
		});

		socket.on('rcjs:supplyToken', function (data) {
			if (data.error) {
				self.emitEvent('rcjs:error', { msg: data.error } );
			}
		});

		socket.on('disconnect', function (data) {
			self.emitEvent('rcjs:serverDisconnect');
		});
	});

	var showTouches = (function (show) {
		var touchelmnts = [], xOffset, yOffset;
		if (show) {
			touchelmnts.push($('<div id="Touch1" class="touch"></div>').appendTo(document.body));
			touchelmnts.push($('<div id="Touch2" class="touch"></div>').appendTo(document.body));
			touchelmnts.push($('<div id="Touch3" class="touch"></div>').appendTo(document.body));
			xOffset = touchelmnts[0].width() / 2;
			yOffset = touchelmnts[0].height() / 2;
		}

	 	return function showTouches (event) { 
			if (event.type === 'touchstart') {
				for (var i = 0; i < event.touches.length; i++) {
					var e = event.touches[i];
					touchelmnts[i].css({
						left: e.clientX - xOffset,
						top: e.clientY - yOffset
					}).addClass('on');
				}	
			} else if (event.type === 'touchmove') {
				for (var i = 0; i < event.touches.length; i++) {
					var e = event.touches[i];
					touchelmnts[i].css({
						left: e.clientX - xOffset,
						top: e.clientY - yOffset
					});
				}
			} else if (event.type === 'touchend') {
				$('.touch').removeClass('on');
				for (var i = 0; i < event.touches.length; i++) {
					touchelmnts[i].addClass('on');
				}
			}
		}
	})(this.showTouches);

	var lastMotionEvent = 0, lastOrientationEvent = 0;

	function genericEventHandler (event) {
		var eventobj = copyEvent(event),
			fireEvent = true,
			ts = new Date().getTime();
		if (self.showTouches) {
			showTouches(event);	
		}
		if (event.type === 'devicemotion') {
			if (ts - lastMotionEvent > self.deviceEventInterval) {
				lastMotionEvent = ts;
			} else {
				fireEvent = false;
			}
		}
		if (event.type === 'deviceorientation') {
			if (ts - lastOrientationEvent > self.deviceEventInterval) {
				lastOrientationEvent = ts;
			} else {
				fireEvent = false;
			}
		}
		if (fireEvent) {
			socket.emit('rcjs:event', { 
				type: event.type, 
				event: eventobj, 
				key: self.key, 
				tokenId: self.tokenId 
			});
		}
		event.preventDefault();
	}

	function capture(doCapture, events) {
		var method = doCapture ? window.addEventListener : window.removeEventListener;
		self.captureEvents = events || self.captureEvents;
		self.captureEvents.forEach(function (type) { 
			method(type, genericEventHandler, false);
		} );
	}

	function copyTouchEvents (event, prop) {
		var a = [];
		if (event[prop]) {
			Array.prototype.forEach.call(event[prop], function (event) {
				a.push({
					clientX: event.clientX,
					clientY: event.clientY,
					pageX: event.pageX,
					pageY: event.pageY,
					identifier: event.identifier
				});
			});
		}
		return a;
	}

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
					gamma: event.gamma
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

	function supplyToken (tokenId) {
		self.tokenId = tokenId;
		socket.emit('rcjs:supplyToken', { tokenId: tokenId } );
	}

	this.addEventListener = function () {
		EventHandler.addEventListener.apply(self, arguments);
	}

	this.removeEventListener = function () {
		EventHandler.removeEventListener.apply(self, arguments);
	}

	this.emitEvent = function () {
		EventHandler.emitEvent.apply(self, arguments);
	}

	return {
		supplyToken: supplyToken,
		addEventListener: this.addEventListener,
		removeEventListener: this.removeEventListener,
		emitEvent: this.emitEvent
	}
}