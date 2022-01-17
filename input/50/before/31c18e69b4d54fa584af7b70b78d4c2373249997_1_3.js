function(page){
			var _self = this;
			return {
				id : page,
				xtype : 'button',
				text : ''+page+'',
				elCls : _self.get('numberButtonCls')
			};
		}