function (message) {
				if (!that.isOpen) {
					that.checkActivePanels(message.range);
				}
			}