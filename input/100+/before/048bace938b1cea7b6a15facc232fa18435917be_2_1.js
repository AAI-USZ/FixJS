function () {
				Ext.create('SmartWFM.view.sourceCodeViewer.Window').show();
				var controller = SmartWFM.app.getController('SourceCodeViewer');
				controller.initButtons();
				controller.load();
			}