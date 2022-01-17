function(fnc){
			for (var i = 0 ; i < this.length ; i++){
				if (false === fnc.call(this,this[i])) break
				}
			return this	
			}