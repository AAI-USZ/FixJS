function pipe(emitter) {
			var pipe, pipeBindings, event, eI, pipedEmitter, pipedEvents;

			console.log(typeof emitter.on);
			console.log(typeof emitter.addEventListener);
			console.log(typeof emitter.attachEvent);

			//validate the element
			if(
				!emitter ||
				typeof emitter !== 'object' ||
				(
					typeof emitter.on !== 'function' &&
					typeof emitter.addEventListener !== 'function' &&
					typeof emitter.attachEvent !== 'object'
				)
			) {
				throw new Error('Cannot pipe events. A vaild DOM object must be provided.');
			}

			pipeBindings = [];
			pipedEvents = [];

			//check to make sure were not pipeing the same emitter twice
			for(eI = 0; eI < pipedEmitters.length; eI += 1) {
				pipedEmitter = pipedEmitters[eI];

				if(pipedEmitter.emitter === emitter) {
					return true;
				}
			}

			//create the pipe
			pipe = {
				"emitter": emitter,
				"add": addEventToPipe
			};

			//add the emitter to the piped array
			pipedEmitters.push(pipe);

			//bind existing events
			for(event in callbacks) {
				if(!callbacks.hasOwnProperty(event)) { continue; }
				addEventToPipe(event);
			}

			return {
				"clear": clear
			};

			/**
			 * Takes an event type and binds to that event (if possible) on the piped emitter
			 * If the event fires it will be piped to this emitter.
			 * @param event
			 */
			function addEventToPipe(event) {
				var pipeBinding = {};

				//check to make sure the event has not been added
				if(pipedEvents.indexOf(event) >= 0) { return; }

				try {
					if(emitter.on) {
						pipeBinding = emitter.on(event, handler);

						//fix for jquery
						if(emitter.jquery && emitter.off) {
							pipeBinding.clear = function() {
								emitter.off(event, handler);
							};
						}
					} else if(emitter.addEventListener) {
						emitter.addEventListener(event, domHandler, false);

						pipeBinding.clear = function() {
							emitter.removeEventListener(event, domHandler, false);
						};
					} else if(emitter.attachEvent){
						emitter.attachEvent('on' + event, domHandler);

						pipeBinding.clear = function() {
							emitter.detachEvent('on' + event, domHandler);
						};
					}
				} catch(e) {}

				pipeBindings.push(pipeBinding);
				pipedEvents.push(event);

				/**
				 * A universal handler to capture an event and relay it to the emitter
				 */
				function handler(    ) {
					var args;

					args = Array.prototype.slice.call(arguments);
					args.unshift(event);

					return trigger.apply(this, args);
				}

				/**
				 * A dom event handler to capture an event and relay it to the emitter
				 */
				function domHandler(eventObj    ) {
					var args;

					args = Array.prototype.slice.call(arguments);
					args.unshift(event);

					if(!trigger.apply(this, args)) {

						//modern browsers
						eventObj.stopPropagation && eventObj.stopPropagation();
						eventObj.preventDefault && eventObj.preventDefault();

						//legacy browsers
						typeof eventObj.cancelBubble !== 'undefined' && (eventObj.cancelBubble = true);
						typeof eventObj.returnValue !== 'undefined' && (eventObj.returnValue = false);
					}
				}
			}

			/**
			 * Clears the pipe so the emitter is no longer captured
			 */
			function clear() {
				var pI;
				pipedEmitters.splice(pipedEmitters.indexOf(emitter), 1);

				for(pI = 0; pI < pipeBindings.length; pI += 1) {
					pipeBindings[pI].clear();
				}
			}
		}