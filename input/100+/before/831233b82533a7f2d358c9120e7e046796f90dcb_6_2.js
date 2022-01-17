function () {

			// remember refernce to this class for callback
			var that = this;

			// highlight editables as long as the mouse is moving
			GENTICS.Utils.Position.addMouseMoveCallback(function () {
				var i, editable;

				for ( i = 0; i < Aloha.editables.length; i++) {
					editable = Aloha.editables[i];
					if (!Aloha.activeEditable && !editable.isDisabled()) {
						editable.obj.addClass('aloha-editable-highlight');
					}
				}
			});

			// fade editable borders when mouse stops moving
			GENTICS.Utils.Position.addMouseStopCallback(function () {
				that.fade();
			});

			// mark active Editable with a css class
			Aloha.bind(
					"aloha-editable-activated",
					function (jEvent, aEvent) {
						that.fade();
					}
			);

		}