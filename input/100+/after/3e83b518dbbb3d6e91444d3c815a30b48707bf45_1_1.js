function(step) {
       			var positionStack = 
        			state.captureCurrentContinuationMarks(aState).ref(
            			types.symbol('moby-application-position-key'));
        
       
       			var locationList = positionStack[positionStack.length - 1];

       			console.log("locationList is ", locationList);

       			var func = locationList.first();
       			if (step !== -1){
       				console.log("step is ", step);
       				locationList = locationList.rest().rest();
       			}
       			else locationList = locationList.rest();
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