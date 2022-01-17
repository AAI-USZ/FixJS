function(){
			if (!this.stack.length ) return;
			fn.reach(this.stack , function(item){
					item.parentNode.removeChild(item) ;	
				})
			}