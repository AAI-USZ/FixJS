function (e) {
				var keyCode, events, canvasElement, eventObject;
				events = this.core.events;
				canvasElement = this.core.canvasElement;

				// Abort if events are disabled
				if (!events.enabled) {
					return;
				}

				// Only trigger events if the pointer has set focus to the canvas
				//  or if there are no pointers registered
				if (this.core.pointer && this.core.pointer.canvasFocused !== true) {
					return;
				}

				keyCode = this.getKeyCode(e);

				// Prevent default for keys that have been added to the prevent list
				this.preventDefault(e);
			
				// Cancel event if the key is already pressed down
				// (some browsers repeat even keydown when held down)
				if (e.type === "keydown" && this.keysDown[keyCode] === true) {
					return;
				}

				// Set the key states when pressed down
				if (e.type === "keydown") {
					this.keysDown[keyCode] = true;
				} else if (e.type === "keyup") {
					delete this.keysDown[keyCode];
				}

				// Get a fixed event object
				eventObject = events.fixEventObject(e, "keyboard");
				events.lastKeyboardEventObject = eventObject;

				// Trigger events
				events.triggerHandlers(canvasElement, [e.type]);

				// Set the timer to trigger keypress events continuously until released
				if (e.type === "keydown") {
					this.keyPressTimers[keyCode] = setInterval(function () {
						events.triggerHandlers(canvasElement, ["keypress"], eventObject);
					}, 1000 / this.core.settings.fps);
				}

				// If there are no more keys pressed down, cancel the keypress timers
				if (e.type === "keyup") {
					if (!this.anyKeysDown()) {
						for (keyCode in this.keyPressTimers) {
							clearInterval(this.keyPressTimers[keyCode]);
						}
					} else {
						clearInterval(this.keyPressTimers[keyCode]);
					}
				}
			}