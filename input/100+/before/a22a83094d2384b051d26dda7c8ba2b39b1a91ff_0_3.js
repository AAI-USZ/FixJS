function (val){
			var
				  rval = this._getSearchRegExp(val)
				, $items = this.$(this.__list).find('.js-filter-item')
				, i = 0
				, n = $items.length
				, node
				, yes = this.s(this.__item+'_filtered', 1)
				, className
			;

			for( ; i < n; i += 1 ){
				className	= ' '+ (node = $items[i]).className +' ';

				if( ~className.indexOf(yes) ){
					className = className.replace(' '+yes+' ', ' ');
					this._removeHighlight(node);
				}

				if( val.length ){
					if( this._filter(node, rval, val) ){
						this._highlight(node, rval, val);
					} else {
						className +=  yes;
					}
				}

				node.className	= $.trim(className);
			}

			this.trigger({ type: 'filter', value: val });
		}