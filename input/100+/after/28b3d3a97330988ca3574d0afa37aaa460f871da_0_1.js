function() {
			var that = this;

			// look for old configuration directly in settings
			if ( typeof this.settings.formatlessPasteOption !== 'undefined') {
				this.formatlessPasteOption = this.settings.formatlessPasteOption;
			}
			
			if ( typeof this.settings.strippedElements !== 'undefined') {
				this.strippedElements = this.settings.strippedElements;
			}
			
			// look for newer config in settings.config
			if (this.settings.config) {
				if (this.settings.config.formatlessPasteOption) {
					this.formatlessPasteOption = this.settings.config.formatlessPasteOption;
				}
				if (this.settings.config.strippedElements) {
					this.strippedElements = this.settings.config.strippedElements;
				}
				if (this.settings.config.button === false) {
					this.button = false;
				}
			}
			
			this.registerFormatlessPasteHandler(); 
			var formatlessPasteHandlerLastState;
			Aloha.bind( 'aloha-editable-activated', function( event, params) {
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
			});
		}