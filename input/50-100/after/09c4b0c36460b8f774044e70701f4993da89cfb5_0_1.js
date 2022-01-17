function() {
				var validator = jQuery( this ).data( "validator", validator );

				if ( validator != null ) {
					// Don't short-circuit so we can record all guesses
					valid = validator() && valid;

					// If this is one of the required entries, and it is not filled in
					// set the flag that indicates that a required entry is not filled in.
					if ( jQuery( this ).attr( "required" ) != undefined && validator.guess === "") {
						missing_required_answer = true;
						// Break out of the each loop since a required item is not set.
						return false;
					}
					guess.push( validator.guess );
				}
			}