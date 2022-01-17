function(v){
			if (!v) return this.length ? this[0].value : '';
			return this.each(function(item){
				item.value = v;	
				})
			}