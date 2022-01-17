function(config) {
		console.log('init Sample.MyObject');
		// check if myvar is present in config.
		// in this case, init with its value
		if('myvar' in config)
			// use "this" to access all method and field
			// of the current instance of the class
			this.myvar = config.myvar;

		//Events are documented at the begining of the class
		this.addEvents('connect', 'disconnect');
	}