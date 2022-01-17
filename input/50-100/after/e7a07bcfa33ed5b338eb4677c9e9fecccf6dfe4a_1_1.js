function(){
			var _self = this,
				bbar = _self.get('bbar'),
				tbar = _self.get('tbar');
			_self._initBar(bbar,_self.get('prefixCls') + CLS_GREID_BBAR,'bbar');
			_self._initBar(tbar,_self.get('prefixCls') + CLS_GREID_TBAR,'tbar');
		}