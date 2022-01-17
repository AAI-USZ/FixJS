function( event, rangeObject ) {
				Format.multiSplitButton.showItem( 'blockquote' );
				var buttons = jQuery( 'button' + nsSel( 'button' ) ); // not used?

				jQuery.each( that.buttons, function( index, button ) {
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

					that.buttons[ 0 ].setPressed( false );
					//button.setPressed( false ); // should it be this instead of that.buttons...?

					if ( statusWasSet ) {
						if( 'q' === tagName ) {
							that.buttons[ 0 ].setPressed( true );
							//button.setPressed( true ); // should it be this instead of that.buttons...?
						} else {
							buttons.filter( nsSel( 'block-button' ) )
							       .addClass( nsClass( 'pressed' ) );
						}

						// We've got what we came for, so return false to break
						// the each loop.
						return false;
					}
				});
			}