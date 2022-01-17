function(h){
			var _self = this,
				bodyHeight = h,
				header = _self.get('header'),
				tbar = _self.get('tbar'),
				bbar = _self.get('bbar');
			bodyHeight -= header.get('el').height();
			if(tbar){
				bodyHeight -= tbar.get('el').height() + HEIGHT_BAR_PADDING;
			}
			if(bbar){
				bodyHeight -= bbar.get('el').height() + HEIGHT_BAR_PADDING ;
			}/**/
			_self.get('body').set('height',bodyHeight);
			if(_self.get('rendered')){
				if(_self.get('forceFit')){
					header.forceFitColumns();
				}
				header.setTableWidth();
			}
			_self.get("el").addClass(CLS_GRID_HEIGHT);
		}