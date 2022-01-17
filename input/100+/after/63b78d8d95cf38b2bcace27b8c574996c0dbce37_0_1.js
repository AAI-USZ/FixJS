function( event, params) {
				var config = that.getEditableConfig( params.editable.obj );
				
				if (!config) {
					return;
				}
				// make button configuration a bit more tolerant
				if (typeof config.button === 'string') {
					config.button = config.button.toLowerCase();
					if (config.button === 'false' || config.button === '0') {
						// disable button only if 'false' or '0' is specified
						config.button = false;
					} else {
						// otherwise the button will always be shown
						config.button = true;
					}
				}

				// make formatlessPasteOption configuration a bit more tolerant
				if (typeof config.formatlessPasteOption === 'string') {
					config.formatlessPasteOption = config.formatlessPasteOption.toLowerCase();
					if (config.formatlessPasteOption === 'false' || config.formatlessPasteOption === '0') {
						// disable button only if 'false' or '0' is specified
						config.formatlessPasteOption = false;
					} else {
						// otherwise the button will always be shown
						config.formatlessPasteOption = true;
					}
				}
				
				if ( config.strippedElements ) {
					FormatlessPasteHandler.strippedElements = config.strippedElements;
				}
				if (config.formatlessPasteOption === true) {
					that.formatlessPasteButton.setPressed(true);
					FormatlessPasteHandler.enabled = true;
				} else if (config.formatlessPasteOption === false) {
					that.formatlessPasteButton.setPressed(false);
					FormatlessPasteHandler.enabled = false;
				}
				if ( config.button === false ) {
					that.formatlessPasteButton.hide();
				} else {
					that.formatlessPasteButton.show();
				}
			}