function( name, val ) {
				// if the value is an object, and has a attrs or serialize function
				where[name] = isObject(val) && typeof val[how] == 'function' ?
				// call attrs or serialize to get the original data back
				val[how]() :
				// otherwise return the value
				val
			}