function () {
			var that = this;
			var $container = this.container;

			// add the event handler for context selection change
			PubSub.sub('aloha.selection.context-change', function (message) {
					that.checkActivePanels(message.range);
				});

			$container.mousedown(function (e) {
					e.originalEvent.stopSelectionUpdate = true;
					Aloha.eventHandled = true;
					//e.stopSelectionUpdate = true;
				});

			$container.mouseup(function (e) {
					e.originalEvent.stopSelectionUpdate = true;
					Aloha.eventHandled = false;
				});

			Aloha.bind('aloha-editable-deactivated', function (event, params) {
					that.checkActivePanels();
				});
		}