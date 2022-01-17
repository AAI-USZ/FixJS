function() {
			var clicked = $( this ).parents( '.customize-section' );
			$( '.customize-section' ).not( clicked ).removeClass( 'open' );
			clicked.toggleClass( 'open' );
			return false;
		}