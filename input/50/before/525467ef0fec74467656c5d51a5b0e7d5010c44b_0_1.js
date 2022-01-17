function(call){
			for (var i = 0 ; i < this.length ; i++){
				if (false === call.call(this,this[i])) break
				}
			return this	
			}