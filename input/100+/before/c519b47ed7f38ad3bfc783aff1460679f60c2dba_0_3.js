function() {
		inlinelog = $("#log");

		socket.emit('controller', { info: 'controller ready' });

		var buttonState = {}, currentlyPressed = {}, mouseDown = false;

		$(".button").each(function(i,e) {
			var b = $(e);
			var offset = b.offset();
			buttonState[b.attr('id')] = {
				height: b.height(),
				width: b.width(),
				top: Math.round(offset.top),
				left: Math.round(offset.left),
				bottom: Math.round(offset.top) + b.height(),
				right: Math.round(offset.left) + b.width(),
				pressed: false,
				intersect : function(x,y) {
					return ( this.left <= x && x <= this.right ) && (this.top <= y && y <= this.bottom);
				}
			}
		});

		// subscribe to touch start, move and end events
		// on each event, iterate through all touches and map touch locations to buttons

		// add any 'pressed' buttons to the hash of pressed buttons
		var updateButtons = function(x,y,pressed) {
			for(var b in buttonState) {
				if (buttonState[b].intersect(x,y)) {
					pressed[b] = true;
				}
			}
		}

		// for each touch event, go through the touches and figure out which buttons are being pressed
		var handleTouchEvent = function(event,type) {
			var pressed = {};
			for (var i=0; i<event.touches.length; i++) {
				if (event.touches[i].pageX) {
					var x = event.touches[i].pageX, y = event.touches[i].pageY;
					updateButtons(x,y,pressed)
				}
			}

			var currentButtons = _.keys(currentlyPressed);
			var nextButtons = _.keys(pressed);

			var toPress = _.difference(nextButtons,currentButtons);
			var toRelease = _.difference(currentButtons, nextButtons);

			// if something something changed, send to server
			if (toPress.length > 0 || toRelease.length > 0) {
				log("+ " + toPress.join(",") + " - " + toRelease.join(","));
				socket.emit('controller', { press: toPress, release: toRelease});
			}

			// these are our new buttons
			currentlyPressed = pressed;

		}

		//var element = document.getElementById('buttonscontainer');
		//element.addEventListener("touchstart", touchStart, false);
		$("#buttonscontainer")
		.bind('touchstart', function (e) {
			handleTouchEvent(e.originalEvent,'start');
		})
		$("#buttonscontainer")
		.bind('touchend', function (e) {
			handleTouchEvent(e.originalEvent,'end');
		})
		.bind('touchmove', function (e) {
			handleTouchEvent(e.originalEvent,'move');
		})

		document.ontouchmove = function(event) {
			event.preventDefault();
		}

	}