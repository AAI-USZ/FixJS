function() {
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
	}