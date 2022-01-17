function() {
			var fallbackResult = undefined;
			var retval = undefined;
			var thisFunc = arguments.callee;
			// Check if someone already set on onbeforeunload hook
			if ( fallbackWindowOnBeforeUnload ) {
				// Get the result of their onbeforeunload hook
				fallbackResult = fallbackWindowOnBeforeUnload();
			}
			// Check if their onbeforeunload hook returned something
			if ( fallbackResult !== undefined ) {
				// Exit here, returning their message
				retval = fallbackResult;
			} else {
				// Check if the current values of some form elements are the same as
				// the original values
				if (
					wgAction == 'submit' ||
					$( '#wpTextbox1' ).data( 'origtext' ) != $( '#wpTextbox1' ).val() ||
					$( '#wpSummary' ).data( 'origtext' ) != $( '#wpSummary' ).val()
				) {
					// Return our message
					retval = mediaWiki.msg( 'vector-editwarning-warning' );
				}
			}
			
			// Unset the onbeforeunload handler so we don't break page caching in Firefox
			window.onbeforeunload = null;
			if ( retval !== undefined ) {
				// ...but if the user chooses not to leave the page, we need to rebind it
				setTimeout( function() {
					window.onbeforeunload = thisFunc;
				} );
				return retval;
			}
		}