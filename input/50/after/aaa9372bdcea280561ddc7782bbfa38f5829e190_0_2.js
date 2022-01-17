function(v){
			if (!v) return this.length ? this[0].innerHTML : '';
			return this.each(function(item){
				item.innerHTML = v;	
				})
			}