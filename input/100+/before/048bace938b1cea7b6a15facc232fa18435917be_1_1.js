function () {
				Ext.create('SmartWFM.view.imageViewer.Window').show();
				var controller = SmartWFM.app.getController('ImageViewer');
				controller.initButtons();
				controller.load();
			}