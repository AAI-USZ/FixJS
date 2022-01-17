function (event, data) {
				var config = self.getEditableConfig(data.editable.obj);

				// make a space separated string out of arrays
				if (jQuery.isArray(config)) {
					config = config.join(' ');
				}

				if (config) {
					self.characterOverlay.setCharacters(config);
					self.insertButton.show();
				} else {
					self.insertButton.hide();
				}
			}