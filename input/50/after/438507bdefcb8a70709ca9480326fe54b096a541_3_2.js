function ( context ) {
				// Animate the containers border
				$( this )
					.parent()
					.animate( {
						borderTopColor: '#aaaaaa',
						borderLeftColor: '#aaaaaa',
						borderRightColor: '#aaaaaa',
						borderBottomColor: '#aaaaaa'
					}, 'fast' );
			}