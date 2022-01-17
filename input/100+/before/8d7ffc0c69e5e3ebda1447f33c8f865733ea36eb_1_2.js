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
	this.token = null;

	if (this.showTouches) {
		$('<div id="Touch1" class="touch">\
            </div><div id="Touch2" class="touch"></div>\
            <div id="Touch3" class="touch"></div>').appendTo(document.body);
	}

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

	function genericEventHandler(event) {
		var eventobj = copyEvent(event);
		
		if (self.showTouches) {
			if (event.type === 'touchmove') {
				$('.touch').hide();
				for (var i = 0; i < event.touches.length; i++) {
					var e = event.touches[i];
					$('#Touch' + (i+1)).css({
						left: e.clientX,
						top: e.clientY
					}).show();
				}
			} else if (event.type === 'touchend') {
				if (event.touches.length === 0) {
					$('.touch').hide();
				}
			}
		}

		socket.emit('rcjs:event', { 
			type: event.type, 
			event: eventobj, 
			key: self.key, 
			tokenId: self.tokenId 
		});
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
				break;
			// XXX This must be throttled, otherwise it fires even when laying flat on a table.
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