function(cfg) {
		var st = Ext.create('Ext.data.ArrayStore', {autoDestroy: true, fields: ['id', 'name'], idIndex: 0,
			data: [
				[1, 'Max resolution'],
				[300, '5 minutes'],
				[1800, '30 minutes'],
				[3600, '1 h'],
				[21600, '6 h'],
				[86400, '24 h']
			]
		});
		
		var elst = Ext.create('Ext.data.DirectStore', {
			directFn: RPC.UserGui.GetGraphElements,
			extraParams: {definitionId: this.graphDefinitionId},
			fields: ['Idx', 'Label', 'Color', 'Op'],
			paramOrder: ['definitionId']
		});
		elst.load({params: {definitionId: this.graphDefinitionId}});
		var pcfg = this.getPortletConfig();
		if (Ext.isString(pcfg.hideElements))
		{
			pcfg.hideElements = pcfg.hideElements.split();
		}
		return Ext.apply(cfg, {
			"source" : this.getPortletConfig(),
			customEditors: {
				step: Ext.create('Ext.form.field.ComboBox', {store: st, valueField: 'id', displayField: 'name'}),
				hideElements: Ext.create('Ext.form.field.ComboBox', {store: elst, valueField: 'Idx', displayField: 'Label', multiSelect: true})
			}
		});
	}