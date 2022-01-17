function(page){
			var _self = this;
			return {
				id : page,
				xclass:'bar-item-button',
				text : ''+page+'',
				elCls : _self.get('numberButtonCls')
			};
		}