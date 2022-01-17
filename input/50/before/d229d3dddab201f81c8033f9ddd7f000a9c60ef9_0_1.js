function( options ) {
			var message = '<p class="nothing">Your browser doesn\'t support canvas elements, and so can\'t draw the method.</p>';
			$( options.numbersContainer ).html( message );
			$( options.gridContainer ).html( message );
		}