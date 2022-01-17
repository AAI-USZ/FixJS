function( event, params) {
				var config = that.getEditableConfig( params.editable.obj );
				
				if ( !config ) {
					return;
				}
				
				if ( jQuery.inArray( 'quote', config ) !== -1 ) {
					that.buttons[ 0 ].show();
				} else {
					that.buttons[ 0 ].hide();
				}
				
				if ( jQuery.inArray( 'blockquote', config ) !== -1 ) {
					Format.multiSplitButton.showItem( 'blockquote' );
				} else {
					Format.multiSplitButton.hideItem( 'blockquote' );
				}
			}