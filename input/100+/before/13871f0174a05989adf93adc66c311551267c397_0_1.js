function( event, params) {
				var config = that.getEditableConfig( params.editable.obj );
				if ( !config.active ) {
					that.buttons[ 0 ].hide();
					return;
				}
			}