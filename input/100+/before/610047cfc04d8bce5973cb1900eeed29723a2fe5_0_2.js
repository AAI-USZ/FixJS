function( options, returnInstance ){

		var method = false,
			instances = [],
			methodArgs;

		// Basic attributes logic
		if( options && !$.isPlainObject( options ) ){
			method = options === false ? 'destroy' : options;
			methodArgs = arguments;
			Array.prototype.shift.call( methodArgs );
		}

		// Apply requested actions on all elements
		this.each(function( i, e ){

			// Plugin call with prevention against multiple instantiations
			var plugin = $.data( e, namespace );

			if( plugin && method ){

				// Call plugin method
				if( plugin[method] ){

					plugin[method].apply( plugin, methodArgs );

				}

			} else if( !plugin && !method ){

				// Create a new plugin object if it doesn't exist yet
				plugin =  $.data( e, namespace, new Plugin( e, options ) );

			}

			// Push plugin to instances
			instances.push( plugin );

		});

		// Return chainable jQuery object, or plugin instance(s)
		return returnInstance && !method ? instances.length > 1 ? instances : instances[0] : this;

	}