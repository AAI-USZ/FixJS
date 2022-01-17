function(){
			var _self = this,
				columnsWidth = _self.getColumnsWidth(),
                emptyColumn = _self.get('emptyColumn'),
                width = _self.get('width');
			if(_self.get('forceFit')){
				_self.forceFitColumns();
			}
			if(_self._isAllowScrollLeft()){
				columnsWidth += CLS_SCROLL_WITH;
                var emptyEl = emptyColumn.get('el');
                if(emptyEl){
                    if(width > columnsWidth){
                        emptyEl.css('width','auto');
                    }else{
                       emptyEl.css('width',CLS_SCROLL_WITH);
                    }
                }
			}
			_self.get('view')._setTableWidth(columnsWidth);
		}