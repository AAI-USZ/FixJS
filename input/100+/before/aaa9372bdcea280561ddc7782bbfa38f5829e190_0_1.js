function(attrName , attrVal){
			if (fn.is_object(attrName)) 	attrVal = false;
				
			if (undefined === attrVal ) return this.stack.length ? this.stack[0].getAttribute(attrName) : '';
			return this.each(function(item){
				if (false === attrVal) {
					fn.each(attrName , function(_attrVal, _attrName){
						item.setAttribute(_attrName , _attrVal);	
						});
				}else{
					item.setAttribute(attrName , attrVal);	
				}
				})
			}