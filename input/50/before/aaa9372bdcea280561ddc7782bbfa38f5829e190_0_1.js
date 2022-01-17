function(v){
			if (!v) return this.stack.length ? this.stack[0].value : '';
			return this.each(function(item){
				item.value = v;	
				})
			}