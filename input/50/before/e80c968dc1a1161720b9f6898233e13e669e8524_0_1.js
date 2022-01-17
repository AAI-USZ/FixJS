function (event) {
							var touch = touches[touchIds[event.identifier]]
							touch.lastClientX = event.clientX;
							touch.lastClientY = event.clientY;
						}