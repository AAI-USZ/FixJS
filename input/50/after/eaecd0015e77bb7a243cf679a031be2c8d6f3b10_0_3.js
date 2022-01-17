function(callback){
		if(this.hasResponseContent())
			$.get(this.getResponseContentViewURL(),callback,"text");
		else
			callback("");
		return this;
	}