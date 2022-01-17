function() {
					document.documentElement.eventWrapper = 0; 
					document.documentElement.attachEvent("onpropertychange", function(e) {
						if (e.propertyName == "eventWrapper") {
							currentHandler.call(event.currentTarget, event, data);
							document.documentElement.detachEvent("onpropertychange",arguments.callee);
						}
					});
				
					document.documentElement.eventWrapper++;
				}