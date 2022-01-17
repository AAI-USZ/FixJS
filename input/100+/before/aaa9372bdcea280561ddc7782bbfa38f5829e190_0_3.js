function(styleName , styleVal , overRide){
			if (fn.is_object(styleName)) 	styleVal = false;
			if (undefined === styleVal) {
				if (!this.stack.length) return '';
				var elem = this.stack[0];
				return elem.currentStyle ? 
				   elem.currentStyle[styleName]
				   :window.getComputedStyle(elem,null).getPropertyValue(styleName);
				}
			if (overRide){
				this.each(function(item){
					item.style.cssText = '';
					});
				}
			return this.each(function(item){
				if (false === styleVal) {
					fn.each(styleName , function(styleVal, _styleName){
						item.style[_styleName] =   _styleVal;	
						});
				}else{
					item.style[styleName] = styleVal;	
				}
				})
			
			}