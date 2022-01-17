function(){
				for(var i = 0, l = chain.length; i < l; ++i){
					chain[i].apply(this, arguments);
				}
			}