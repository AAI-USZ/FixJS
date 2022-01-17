function( eventName ) {
		if ( eventName === 'add' || eventName === 'remove' || eventName === 'reset' ) {
			var dit = this, args = arguments;
			
			if (eventName === 'add') {
				args = _.toArray(args);
				// the fourth argument in case of a regular add is the option object.
				// we need to clone it, as it could be modified while we wait on the eventQueue to be unblocked
				if (_.isObject(args[3])) {
					args[3] = _.clone(args[3]);
				}
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