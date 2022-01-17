function() {
		this.getBrowserView().setLoading({msg: SmartWFM.lib.I18n.get('swfm', 'Loading ...')});
		// todo https://github.com/SmartWFM/swfm/issues/1
		console.log(this.getRenameField().getRawValue());

		/*SmartWFM.lib.RPC.request({
			action: 'file.rename',
			params: {
				path: path,
				name: name_old,
				name_new: name_new,
				overwrite: false
			},
			successCallback: function() { // called on success
				SmartWFM.lib.Event.fire('', 'refresh', basePath);
				// ToDo: specify which window has to be closed
				Ext.ComponentQuery.query('window[basePath="'+basePath+'"]')[0].close();
			}
		});*/
	}