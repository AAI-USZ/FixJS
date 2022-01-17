function(val){
					var elem = this;
					webshims.contentAttr(elem, 'placeholder', val);
					pHolder.update(elem, val);
				}