function( event, params) {
				var config = that.getEditableConfig( params.editable.obj );
				if ( config && config.formatlessPasteOption ) {
					that.formatlessPasteOption = true;
					that.registerFormatlessPasteHandler(); 
				};

				if ( config && typeof config.strippedElements !== 'undefined') {
					that.strippedElements = config.strippedElements;
				}
				
			}