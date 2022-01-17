function(basePath, name) {
		var loadingMask = new Ext.LoadMask(Ext.getBody(), {
			createNewFolderLoadingMask: true, 	// used to identify loading mask
			msg: SmartWFM.lib.I18n.get('swfm', 'Please wait ...')
		}).show();
		SmartWFM.lib.RPC.request({
			action: 'dir.create',
			params: {
				path: basePath,
				name: name
			},
			successCallback: function() { // called on success
				SmartWFM.lib.Event.fire('', 'refresh', basePath);
				// ToDo: specify which window has to be closed
				Ext.ComponentQuery.query('window[basePath="'+basePath+'"]')[0].close();
			},
			callback: function() {	// called allways
				Ext.ComponentQuery.query('loadmask[createNewFolderLoadingMask]')[0].destroy();
			}
		});
	}