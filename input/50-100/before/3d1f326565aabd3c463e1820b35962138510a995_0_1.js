function(/*Anything*/ v){
			// summary:
			//		Returns the type of the given value.
			// v: Anything
			//		The value.

			return lang.isArray(v) ? "array" : lang.isFunction((v || {}).getTime) ? "date" : v != null && {}.toString.call(v) == "[object Object]" ? "object" : "value";
		}