function () {
				var window = Ext.create('SmartWFM.view.imageViewer.Window');
				window.show();
				var controller = SmartWFM.app.getController('ImageViewer');
				if(controller.imageFiles.length == 1) {
					var previousButton = window.query('button[action=previous]')[0];
					var nextButton = window.query('button[action=next]')[0];
					previousButton.destroy();
					nextButton.destroy();
				} else {
					Ext.create('Ext.util.KeyNav', {
						target: window.getEl(),
						left: controller.previous,
						right: controller.next,
						pageUp: controller.previous,
						pageDown: controller.next,
						scope: controller
					});
				}
				controller.load();
			}