function( inx, curentVideo ){
			// make sure the base volume is zero
			$( curentVideo )[0].muted = true;
			// make base opacity .5
			$( curentVideo ).css( 'opacity', '.5');
		}