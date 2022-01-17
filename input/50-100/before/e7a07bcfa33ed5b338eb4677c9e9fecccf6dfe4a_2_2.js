function(w){
			var _self = this;
			_self.get('header').set('width',w);
			_self.get('body').set('width',w);
			_self.get("el").addClass(CLS_GRID_WITH);
		}