function() {
		// viewer
		var archiveViewer = Ext.extend(Ext.menu.Item, {
			text: SmartWFM.lib.I18n.get('plugin.archives', 'Archive Viewer'),
			icon: SmartWFM.lib.Icon.get('archive.extract', 'action', '32x32'),
			disabled: true,
			initComponent: function() {
				this.callParent();

				var files = this.context.files;
				var regex = new RegExp("application/(x-(([g]?zip)|(bzip2)))|zip|gtar");
				var archiveFiles = [];

				for(var i in files) {
					var file = files[i];
					if(file.mimeType && file.mimeType.match(regex))
						archiveFiles.push(file);
				}
				if(archiveFiles.length)
					this.setDisabled(false);

				var controller = SmartWFM.app.getController('Archives');
				controller.files = archiveFiles;
			},
			handler: function () {
				Ext.create('SmartWFM.view.archives.ViewerWindow').show();
				var controller = SmartWFM.app.getController('Archives');
				controller.load();
			}
		});
		SmartWFM.lib.Menu.add('archives.viewer', archiveViewer);

		// create archives
		var archiveCreate = Ext.extend(Ext.menu.Item, {
			text: SmartWFM.lib.I18n.get('plugin.archives', 'Create archive'),
			icon: SmartWFM.lib.Icon.get('archive.insert', 'action', '32x32'),
			handler: function () {
				var selection = Ext.ComponentQuery.query('viewport > browser')[0].getActiveTab().down('dataview, gridpanel').getSelectionModel().getSelection();
				if(selection.length >= 1) {
					var root = '/';
					var items = new Array();
					for(var i = 0; i < selection.length; i++) {
						var item = selection[i].getData();
						root = item['path'];
						items.push(item['name']);
					}
					var controller = SmartWFM.app.getController('Archives');
					controller.createArchiveData = {
						path: root,
						files: items
					};
					Ext.create('SmartWFM.view.archives.CreateWindow').show();
				}
			}
		});
		SmartWFM.lib.Menu.add('archives.create', archiveCreate);
	}