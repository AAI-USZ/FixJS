function(aState, details, pos, args) {

		var positionStack = 
        		state.captureCurrentContinuationMarks(aState).ref(
            		types.symbol('moby-application-position-key'));
        

		if(aState === undefined || (positionStack[positionStack.length - 1] === undefined)) {
			throwUncoloredCheckError(aState, details, pos, args);
		}
		else {
			throwColoredCheckError(aState,details, pos, args);
		}
	}