function( event, params) {
				var config = that.getEditableConfig( params.editable.obj );
				if ( config.formatlessPasteOption ) {
					that.formatlessPasteOption = true;
					that.registerFormatlessPasteHandler(); 
				};

				if ( typeof config.strippedElements !== 'undefined') {
					that.strippedElements = config.strippedElements;
				}
				
			}