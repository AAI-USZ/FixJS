function(aState, formatStr, args) {
		 	check(aState, aState, formatStr, isString, 'format', 'string', 1, [formatStr].concat(args));
			aState.v =  types.string( helpers.format(formatStr, args, 'format') );
		 }