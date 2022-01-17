function(event){

			// Setup this and arguments for inside loops
			var base = this,
				args = Array.prototype.slice.call(arguments, 1);

			// Make sure that event and events hash exist before continuing
			if(_.isUndefined(event) || _.isUndefined(base._events)) return base;

			if(event.indexOf('.') !== -1 && !_.isUndefined(base._events[event])){
				
				// Loop through events and call the callbacks
				_.each(base._events[event], function(f){
					f.apply(base, args);
				});

			}

			// If an exact namespaced match was not found, loop all events
			_.each(base._events, function(f,e){

				// Match event names without namespaces
				var match = e.match(/^([^.]+)/g);

				// Test that event name matches
				if(match && match[0] == event){

					// Loop through events and call the callbacks
					_.each(base._events[e], function(f){
						f.apply(base, args);
					});

				}
			});

			return base;

		}