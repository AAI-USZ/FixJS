function( event, rangeObject ) {
				var buttons = jQuery( 'button' + nsSel( 'button' ) ); // not used?

				// Set to false to prevent multiple buttons being active
				// when they should not.
				var statusWasSet = false;
				var tagName;
				var effective = rangeObject.markupEffectiveAtStart;
				var i = effective.length;

				// Check whether any of the effective items are citation
				// tags.
				while ( i ) {
					tagName = effective[ --i ].tagName.toLowerCase();
					if ( tagName === 'q' || tagName === 'blockquote' ) {
						statusWasSet = true;
						break;
					}
				}

				buttons.filter( nsSel( 'block-button' ) )
					.removeClass( nsClass( 'pressed' ) );

				ComponentState.setState('quote', 'state', false);

				if ( statusWasSet ) {
					if( 'q' === tagName ) {
						ComponentState.setState('quote', 'state', true);
					} else {
						buttons.filter( nsSel( 'block-button' ) )
							.addClass( nsClass( 'pressed' ) );
					}

					// We've got what we came for, so return false to break
					// the each loop.
					return false;
				}
				
				// switch item visibility according to config
				var config = [];
				if ( Aloha.activeEditable ) {
		        	var config = that.getEditableConfig( Aloha.activeEditable.obj );
				}

				debugger;
				
				// quote
				if ( jQuery.inArray( 'quote', config ) != -1 ) {
					ComponentState.setState('quote', 'show', true);
	        	} else {
					ComponentState.setState('quote', 'show', false);
	        	}
				
				// blockquote
				if ( jQuery.inArray( 'blockquote', config ) != -1 ) {
					Format.multiSplitButton.showItem( 'blockquote' );
	        	} else {
	        		Format.multiSplitButton.hideItem( 'blockquote' );
	        	}
			}