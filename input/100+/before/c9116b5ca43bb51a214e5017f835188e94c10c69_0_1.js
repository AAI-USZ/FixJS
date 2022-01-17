function(event,nodeInterface,callback,args,value) {
		this.setProperty(nodeInterface,value);
		if (callback) {
			callback(args);
		}
	}