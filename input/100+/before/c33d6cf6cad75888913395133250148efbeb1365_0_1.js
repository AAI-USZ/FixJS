function() {
		var v = this.getArchiveViewer();
		v.setLoading(true);

		// getting first file in list (only one we need)
		var f = this.files[0];

		SmartWFM.lib.RPC.request({
			action: 'archive.list',
			params: f['path'] + '/' + f['name'],
			successCallback: function(result) { // called on success
				var controller = SmartWFM.app.getController('Archives');
				var root = {
					id: '.',
					expanded: true,
					children: controller.parseResult(result, '.')
				};
				controller.createTree(root);
			},
			callback: function() {	// called allways
				Ext.ComponentQuery.query('archiveViewer')[0].setLoading(false);
			}
		});
	}