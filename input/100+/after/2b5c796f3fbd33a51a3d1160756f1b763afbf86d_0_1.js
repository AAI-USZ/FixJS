function( fullbool ) {
			var arr = [],
				i = 0,
				tmpthis;
			if ( this.length > 1 ) {
				tmpthis = this.transpose();
				for ( ; i < tmpthis.length; i++ ) {
					arr[i] = jStat[ passfunc ]( tmpthis[i] );
				}
				if ( fullbool === true ) {
					arr = jStat[ passfunc ]( arr );
				}
			} else {
				arr = jStat[ passfunc ]( this[0] );
			}
			return arr;
		}