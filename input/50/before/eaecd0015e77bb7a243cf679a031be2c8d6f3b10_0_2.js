function(callback){
		if(this.hasRequestContent())
			$.get(this.getRequestContentViewURL(),callback);
		else
			callback("");
		return this;
	}