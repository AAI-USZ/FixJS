function(){
			if (!this.length ) return;
			fn.reach(this , function(item){
					item.parentNode.removeChild(item) ;	
				})
			}