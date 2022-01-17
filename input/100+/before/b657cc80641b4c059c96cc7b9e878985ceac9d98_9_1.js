function( event, params) {
				var config = that.getEditableConfig( params.editable.obj );
				if ( !config ) {
					return;
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