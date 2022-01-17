function(callback){
		if(this.hasRequestContent())
			$.get(this.getRequestContentViewURL(),callback,"text");
		else
			callback("");
		return this;
	}