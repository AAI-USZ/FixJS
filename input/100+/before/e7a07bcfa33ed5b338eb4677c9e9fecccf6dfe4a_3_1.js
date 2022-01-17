function(){
			var _self = this,
				columnsWidth = _self.getColumnsWidth();
			if(_self.get('forceFit')){
				_self.forceFitColumns();
			}
			if(_self._isAllowScrollLeft()){
				columnsWidth += CLS_SCROLL_WITH;
			}
			_self.get('view')._setTableWidth(columnsWidth);
		}