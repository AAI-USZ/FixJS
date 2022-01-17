function(/*String*/ id){
			// summary:
			//		Remove a view from the registry.
			if(this.hash[id]){
				delete this.hash[id];
				this.length--;
			}
		}