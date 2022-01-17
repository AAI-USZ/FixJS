function(){
		for(var name in candoc.content.helpers){
			new candoc.content.helpers[name](this.element)
		}
	}