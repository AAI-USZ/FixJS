function(aState, x, args) {
		 	var allArgs = [x].concat(args);
		 	check(aState, x, isNumber, '/', 'number', 1, allArgs);
		 	arrayEach(args, function(y, i) {check(aState, y, isNumber, '/', 'number', i+2, allArgs);});
			
		 	


       		var handleError = function(step) {
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

			if (args.length == 0) {
				if ( jsnums.equals(x, 0) ) {
					handleError(0);
				}	
				return jsnums.divide(1, x);
			}

		 	var res = x;
		 	
		 	for (var i = 0; i < args.length; i++) {
				if ( jsnums.equals(args[i], 0) ) {
					handleError(i);
				}	
				res = jsnums.divide(res, args[i]);
		 	}
		 	return res;
		 }