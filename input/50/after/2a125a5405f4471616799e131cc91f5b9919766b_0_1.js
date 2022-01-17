function( values ){
				// Return the number of elements that should be drawn for this object.
				return Math.ceil( values.cache.begins.getDaysBetween( values.cache.ends, true ) )+1;
			}