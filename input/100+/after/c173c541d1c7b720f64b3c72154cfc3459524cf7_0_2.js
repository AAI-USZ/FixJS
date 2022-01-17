function(aState, x, f, functionName, typeName, position, args) {
		console.log("aState:", aState, ", x:", x, ", f:" , f, ", functionName:", functionName, ", typeName:", typeName, ", position:", position, ", args:", args);
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