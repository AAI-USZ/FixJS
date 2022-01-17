function(callback){
		if(this.hasResponseContent())
			$.get(this.getResponseContentViewURL(),callback);
		else
			callback("");
		return this;
	}