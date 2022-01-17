function(aState, x, f, functionName, typeName, position, args) {
		if ( !f(x) ) {
			throwCheckError(aState, 
					[functionName,
					 typeName,
					 helpers.ordinalize(position),
					 x],
					position,
					args);
		}
	}