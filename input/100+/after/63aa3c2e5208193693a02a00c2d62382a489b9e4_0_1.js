function trigger(event    ) {
			var args, cI, eI, blockEventBubble;

			//validate the event
			if(typeof event !== 'string' && typeof event !== "object" && typeof event.push !== 'function') { throw new Error('Cannot trigger event. The passed event is not a string or an array.'); }

			//get the arguments
			args = Array.prototype.slice.apply(arguments).slice(1);

			//handle event arrays
			if(typeof event === 'object' && typeof event.push === 'function') {

				//for each event in the event array self invoke passing the arguments array
				for(eI = 0; eI < event.length; eI += 1) {

					//add the event name to the beginning of the arguments array
					args.unshift(event[eI]);

					//trigger the event
					if(trigger.apply(this, args) === false) {
						blockEventBubble = true;
					}

					//shift off the event name
					args.shift();
				}

				return !blockEventBubble;
			}

			//if the event has callbacks then execute them
			if(callbacks[event]) {

				//fire the callbacks
				for(cI = 0; callbacks[event] && cI < callbacks[event].length; cI += 1) {
					if(callbacks[event][cI].apply(this, args) === false) {
						blockEventBubble = true;
					}
				}
			}

			return !blockEventBubble;
		}