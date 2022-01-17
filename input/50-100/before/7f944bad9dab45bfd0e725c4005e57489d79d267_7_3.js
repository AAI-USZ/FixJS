function(val){
					var elem = this;
					var placeholder = webshims.contentAttr(elem, 'placeholder');
					$.removeData(elem, 'cachedValidity');
					var ret = desc[propType]._supset.call(elem, val);
					if(placeholder && 'value' in elem){
						changePlaceholderVisibility(elem, val, placeholder);
					}
					return ret;
				}