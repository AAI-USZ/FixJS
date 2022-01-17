function(direction,action){
		var url = HoneyProxy.config.get("content")
		+"/"+this.get("id")
		+"/"+direction+"/"+action
		+"?"+$.param(
				{"auth":HoneyProxy.config.get("auth")});
		return url;
	}