function(button) {
		var browserView = this.getBrowserView();
		browserView.setLoading({msg: SmartWFM.lib.I18n.get('swfm', 'Loading ...')});
		var values = this.getRenameForm().getForm().getValues();

		if(values['name'] == values['oldName']) {
			Ext.Msg.show({
				title: SmartWFM.lib.I18n.get('plugin.baseActions', 'Rename'),
				msg: SmartWFM.lib.I18n.get('plugin.baseActions.error', 'The filename has not changed.'),
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.INFO
			});
			browserView.setLoading(false);
			return;
		}

		SmartWFM.lib.RPC.request({
			action: 'file.rename',
			params: {
				path: values['path'],
				name: values['oldName'],
				name_new: values['name'],
				overwrite: false
			},
			successCallback: function() { // called on success
				SmartWFM.lib.Event.fire('', 'refresh', values['path']);
				this.window.close();
			},
			successScope: {
				window: button.up('rename')
			},
			callback: function() {	// called allways
				this.browserView.setLoading(false);
			},
			scope: {
				browserView: browserView
			}
		});
	}