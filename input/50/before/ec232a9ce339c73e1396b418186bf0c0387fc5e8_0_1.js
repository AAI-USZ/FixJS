function( inx, curentVideo ){
			// make sure the base volume is zero
			$( curentVideo )[0].volume = 0;
			// make base opacity .5
			$( curentVideo ).css( 'opacity', '.5');
		}