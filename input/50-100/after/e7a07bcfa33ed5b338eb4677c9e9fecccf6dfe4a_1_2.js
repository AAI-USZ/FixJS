function(w){
			var _self = this,
                prefixCls = _self.get('prefixCls');
			_self.get('header').set('width',w);
			_self.get('body').set('width',w);
			_self.get("el").addClass( prefixCls + CLS_GRID_WITH);
		}