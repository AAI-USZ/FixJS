function(evnt){
		var args = (arguments.length > 1) ? __slice.call(arguments, 1) : [];
		return $this.trigger(evnt, args);
	}