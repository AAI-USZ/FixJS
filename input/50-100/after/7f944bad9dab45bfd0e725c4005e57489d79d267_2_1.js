function(val){
					var elem = this;
					if(bustedTextarea){
						webshims.data(elem, 'textareaPlaceholder', val);
						elem.placeholder = '';
					} else {
						webshims.contentAttr(elem, 'placeholder', val);
					}
					pHolder.update(elem, val);
				}