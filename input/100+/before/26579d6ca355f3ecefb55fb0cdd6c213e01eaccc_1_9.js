function(){
		var args = Array.from(arguments);
		return args.map(this.getProperty, this).associate(args);
	}