function() {
				var validator = jQuery( this ).data( "validator", validator );

				if ( validator != null ) {
					// Don't short-circuit so we can record all guesses
					valid = validator() && valid;

					guess.push( validator.guess );
				}
			}