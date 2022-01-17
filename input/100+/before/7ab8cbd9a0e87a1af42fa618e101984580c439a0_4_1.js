function(aState, details, pos, args) {
		if(aState === undefined) {
			var errorFormatStr;
			if (args && args.length > 1) {
				var errorFormatStrBuffer = ['~a: expects type <~a> as ~a arguments, given: ~s; other arguments were:'];
				for (var i = 0; i < args.length; i++) {
					if ( i != pos-1 ) {
						errorFormatStrBuffer.push( types.toWrittenString(args[i]) );
					}
				}
				errorFormatStr = errorFormatStrBuffer.join(' ');
			}
			else {
				errorFormatStr = "~a: expects argument of type <~a>, given: ~s";
				details.splice(2, 1);
			}

			raise( types.incompleteExn(types.exnFailContract,
						   helpers.format(errorFormatStr, details),
						   []) );
		}
		else {
			var positionStack = 
        		state.captureCurrentContinuationMarks(aState).ref(
            		types.symbol('moby-application-position-key'));
        
       		var locationList = positionStack[positionStack.length - 1];



       		var getArgColoredParts = function(locations) {
				var argColoredParts = [];
				var locs = locations;
				if (args.length > 0) {
					for (var i = 0; i < args.length; i++) {
						if(i != pos -1) { 
							argColoredParts.push(new types.ColoredPart(args[i]+" ", locs.first()));
						}
						locs = locs.rest();
					}
				}
				return argColoredParts;
			}
			var getLocation = function(pos) {
				var locs = locationList;
				var toReturn;
				for(var i = 0; i < args.length; i++) {
					if(i === pos){
						toReturn = locs.first();
					} 
					locs = locs.rest();
				}
				return toReturn;
			}

			var argColoredParts = getArgColoredParts(locationList);


			raise( types.incompleteExn(types.exnFailContract,
						   new types.Message([
						   		new types.ColoredPart(details[0], locationList.first()),
						   		": expects type <",
						   		details[1],
						   		"> as ",
						   		details[2], 
						   		"argument, given: ",
						   		new types.ColoredPart(details[3], getLocation(pos)),
						   		"; other arguments were: ",
						   		new types.GradientPart(argColoredParts)
						   	]),
						   []) );



		}
	}