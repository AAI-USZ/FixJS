function(config) {
		// check if myVar is present in config.
		// in this case, init with its value
		if('myVar' in config) {
			// use "this" to access all method and field
			// of the current instance of the class
			this.myVar = config.myVar;
		}

		//Events are documented at the begining of the class
		this.addEvents('connect', 'disconnect');
	}