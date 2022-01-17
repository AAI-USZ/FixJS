function( v, i ) {

				// default to 0 when nulls exist
				v = ( v || 0 ).toString( 16 );
				return v.length == 1 ? "0" + v : v;
			}