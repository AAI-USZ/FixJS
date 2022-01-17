function(){
					var ret = (bustedTextarea) ? webshims.data(this, 'textareaPlaceholder') : '';
					return ret || webshims.contentAttr(this, 'placeholder');
				}