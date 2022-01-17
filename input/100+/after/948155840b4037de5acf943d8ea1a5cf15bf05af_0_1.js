function() {
		this.queue = []
		this.nodeId = false;
		this.refreshInterval = 5;

		if (this.showToolbar && ! this.exportMode) {
			
			this.tbar = Ext.create('Ext.toolbar.Toolbar', {
					//baseCls: 'x-panel-header',
					//height: 27,
					items: [
						{
							xtype: 'tbtext',
							text: "<img src='widgets/stream/logo/ui.png' height='19' width='19'></img>"
						},{
							xtype: 'combobox',
							id: this.id + '-state',
							queryMode: 'local',
							displayField: 'text',
							valueField: 'value',
							width: 70,
							value: 0,
							store: {
								xtype: 'store',
								fields: ['value', 'text'],
								data: [
									{value: 0, text: 'Ok'},
									{value: 1, text: 'Warning'},
									{value: 2, text: 'Critical'}
								]
							}
						},{
							xtype: 'textfield',
							emptyText: _('Leave a') + ' ' + _('event') + ' ?',
							id: this.id + '-message',
							width: 300,
							listeners: {
								specialkey: {
									fn: function(field, e) {
										if (e.getKey() == e.ENTER)
											this.publish_event();
									},
									scope: this
								}

							}
						},
						'->', {
							iconCls: 'icon-control-repeat',
							tooltip: _('Clear tray'),
							scope: this,
							handler: function() {
								this.wcontainer.removeAll(true);
							}
						},{
							iconCls: 'icon-control-pause',
							tooltip: _('Pause stream'),
							scope: this,
							enableToggle: true,
							toggleHandler: function(button, state) {
								if (state) {
									button.setIconCls('icon-control-play');
									this.unsubscribe();
								}else {
									button.setIconCls('icon-control-pause');
									this.subscribe();
								}
							}
						}
					]
				});
		}

		this.callParent(arguments);
	}