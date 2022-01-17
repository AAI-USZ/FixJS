function(step) {
       			var positionStack = 
        			state.captureCurrentContinuationMarks(aState).ref(
            			types.symbol('moby-application-position-key'));
        
       
       			var locationList = positionStack[positionStack.length - 1];
       			var func = locationList.first();
       			locationList = locationList.rest().rest();
       			var i;

       			for(i = 0; i< step; i++) {
       				locationList = locationList.rest();
       			}

       			raise( types.incompleteExn(types.exnFailContractDivisionByZero, 
												new types.Message([new types.ColoredPart('/', func),
													": division by ",
													new types.ColoredPart("zero", locationList.first())]),
												[]) );

       		}