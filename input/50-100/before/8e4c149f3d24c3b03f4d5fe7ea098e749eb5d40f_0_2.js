function(e) {
					if (e.propertyName == "eventWrapper") {
						currentHandler.call(event.currentTarget, event, data);
						document.documentElement.detachEvent("onpropertychange",arguments.callee);
					}
				}