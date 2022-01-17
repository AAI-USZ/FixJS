function onNotFound(){
				if(cache[requested]){
					delete cache[requested];
				}
				
				if(next)
					next();
			}