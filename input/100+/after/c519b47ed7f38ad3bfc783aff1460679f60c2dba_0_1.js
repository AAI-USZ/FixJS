function(event) {
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

				// add pressed class to pressed
				_.each(toPress,function(b) { buttonState[b].button.addClass('pressed'); });
				_.each(toRelease,function(b) { buttonState[b].button.removeClass('pressed'); });
			}

			// these are our new buttons
			currentlyPressed = pressed;

		}