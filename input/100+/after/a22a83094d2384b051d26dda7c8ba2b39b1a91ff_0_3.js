function (val){
			var
				  rval = this._getSearchRegExp(val)
				, $items = this.$(this.__list).find('.js-filter-item')
				, i = 0
				, n = $items.length
				, node
				, yes = this._itemFilteredClassName
				, className
			;

			for( ; i < n; i += 1 ){
				className	= ' '+ (node = $items[i]).className +' ';

				if( ~className.indexOf(yes) ){
					className = className.replace(' '+yes+' ', ' ');
				}
				else {
					this._removeHighlight(node);
				}

				if( val.length ){
					if( this._filter(node, rval, val) ){
						this._highlight(node, rval, val);
					} else {
						className += yes;
					}
				}

				node.className	= $.trim(className);
			}

			this.trigger({ type: 'filter', value: val });
		}