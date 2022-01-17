function(v){
			if (!v) return this.stack.length ? this.stack[0].innerHTML : '';
			return this.each(function(item){
				item.innerHTML = v;	
				})
			}