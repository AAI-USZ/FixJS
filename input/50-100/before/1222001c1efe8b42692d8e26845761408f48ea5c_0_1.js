function(aState, details, pos, args) {
		if(aState === undefined || (positionStack[positionStack.length - 1] === undefined)) {
			throwUncoloredCheckError(aState, details, pos, args);
		}
		else {
			throwColoredCheckError(aState,details, pos, args);
		}
	}