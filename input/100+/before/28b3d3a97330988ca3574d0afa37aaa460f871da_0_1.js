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
			}
			
			if ( this.formatlessPasteOption ) {
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
					if ( config.formatlessPasteOption ) {
						that.formatlessPasteButton.show();
						if ( typeof formatlessPasteHandlerLastState !== 'undefined' ) {
							FormatlessPasteHandler.enabled = formatlessPasteHandlerLastState;
						}
					} else {
						that.formatlessPasteButton.hide();
						formatlessPasteHandlerLastState = FormatlessPasteHandler.enabled;
						FormatlessPasteHandler.enabled = false;
					}
				});
			};
		}