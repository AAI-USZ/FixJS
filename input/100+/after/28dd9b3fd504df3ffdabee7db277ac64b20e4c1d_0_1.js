function( eventName ) {
		if ( eventName === 'add' || eventName === 'remove' || eventName === 'reset' ) {
			var dit = this, args = arguments;
			
			if (eventName === 'add') {
				var toBeCloned = args;
				args = [];
				_.each(toBeCloned, function(arg, index) {
					if (index === 3) {
						// these are the options containing the index a model element was added at.
						var clonedArg = _.clone(arg);
						args.push(clonedArg);
					} else {
						args.push(arg);
					}
				});
			}
			
			Backbone.Relational.eventQueue.add( function() {
					trigger.apply( dit, args );
				});
		}
		else {
			trigger.apply( this, arguments );
		}
		
		return this;
	}