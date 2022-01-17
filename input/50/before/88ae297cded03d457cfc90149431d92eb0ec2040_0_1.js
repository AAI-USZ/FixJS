function(type, debug){
			// Returning an object instead of an even as the event's target cannot be set to IndexedDB Objects
			// We still need to have event.target.result as the result of the IDB request
			return {
				"type": type,
				debug: debug,
				bubbles: false,
				cancelable: false,
				eventPhase: 0,
				timeStamp: new Date(),
			};
		}