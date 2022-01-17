function(event){

			// Setup this for inside loops
			var base = this;

			// Make sure that event and events hash exist before continuing
			if(_.isUndefined(event) || _.isUndefined(base._events)) return base;

			// If the full event string exists, call it
			if(!_.isUndefined(base._events[event])){

				_.each(base._events[event], function(f){
					f.apply(base, Array.prototype.slice.call(arguments, 1));
				});

			} else {
				
				// Otherwise it might be a namespaced event.  Loop events to test
				_.each(base._events, function(fs, e){

					// Get the first part of the event name (ex. 'change.eventr' yields 'change')
					var match = e.match(/^([^.]+)/g);

					// If a match was found and that match equals the event name, call trigger with the fully qualified name
					if(match.length == 1 && match[0] == event){
						base.trigger(e, Array.prototype.slice.call(arguments, 1));
					}
				});

			}

			return base;

		}