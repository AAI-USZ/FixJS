function(e){
					currentHandler.call(event.currentTarget, event, data);
					document.removeEventListener('eventWrapper',arguments.callee, false);
				}