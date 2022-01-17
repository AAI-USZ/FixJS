function (e, inputName) {
				var properties = "altKey ctrlKey metaKey shiftKey button charCode keyCode clientX clientY pageX pageY screenX screenY detail eventPhase isChar touches targetTouches changedTouches scale rotation".split(" "),
					numProps = properties.length,
					eventObject, i, property, buttonConversion;
				
				// Fix specific properties and methods
				eventObject = {
					originalEvent: e,
					timeStamp: (new Date()).getTime(),
					which: e.which === 0 ? e.keyCode : e.which,
					
					preventDefault: function () {
						e.preventDefault();
					},
					
					stopPropagation: function () {
						if (this.bubbles) {
							this.stoppingPropagation = true;
						}
						e.stopPropagation();
					}
				};
				
				// Set selected original properties
				for (i = 0; i < numProps; i++) {
					property = properties[i];
					if (e[property] !== undefined) {
						eventObject[property] = e[property];
					}
				}

				// Add pointer coordinates
				if (~"mouse touch".indexOf(inputName)) {
					eventObject.x = this.core[inputName].x;
					eventObject.y = this.core[inputName].y;
				}

				// Fix the which property for mouse events
				if (inputName === "mouse") {
					// 0: No button pressed
					// 1: Primary button (usually left)
					// 2: Secondary button (usually right)
					// 3: Middle (usually the wheel)
					buttonConversion = {
						0: 1,
						2: 2,
						1: 3,
						"default": 0
					};
					eventObject.which = buttonConversion[eventObject.button] || buttonConversion["default"];
				}

				// Fix the which property for touch events
				if (inputName === "touch") {
					eventObject.which = 0;
				}

				return eventObject;
			}