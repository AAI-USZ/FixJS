function DclError(message){
		if(Error.captureStackTrace){
			Error.captureStackTrace(this, DclError);
		}
		var e = Error.call(this, message), name;
		for(name in e){
			if(e.hasOwnProperty(name)){
				this[name] = e[name];
			}
		}
		this.message = message;
	}