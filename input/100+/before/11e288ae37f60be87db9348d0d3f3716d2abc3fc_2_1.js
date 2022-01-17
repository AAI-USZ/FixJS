function(aState, details, pos, args) {
		if(aState === undefined) {
			var errorFormatStr;
			if (args && args.length > 1) {
				var errorFormatStrBuffer = ['~a: expects type ~a as ~a arguments, given: ~s; other arguments were:'];
				for (var i = 0; i < args.length; i++) {
					if ( i != pos-1 ) {
						errorFormatStrBuffer.push( types.toWrittenString(args[i]) );
					}
				}
				errorFormatStr = errorFormatStrBuffer.join(' ');
			}
			else {
				errorFormatStr = "~a: expects argument of type ~a, given: ~s";
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

       		/*var getArgColoredParts = function(locations) {
				var argColoredParts = [];
				var locs = locations;
				if (args.length > 0) {
					for (var i = 0; i < args.length; i++) {
						if(! (locs.isEmpty())){
							if(i != pos -1) { 
								argColoredParts.push(new types.ColoredPart(args[i]+" ", locs.first())); 
							}
							locs = locs.rest();
						}
					}
				}
				return argColoredParts;
			}*/
			var getArgColoredParts = function(locations) {
				var coloredParts = [];
				var locs = locations;


				//ARGS IS INCONSISTENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//and when there's a state, it's apparently not an array, so .slice(1) doesn't work
				if(state.isState(args[0])){
					for(var i = 1; i < args.length; i++){
						if(i != pos) {
							coloredParts.push(new types.ColoredPart(args[i]+" ", locs.first()));
						}
						locs = locs.rest();
					}
				}
				else {
					for(var i = 0; i < args.length; i++){
						if(i != (pos -1)) {
							coloredParts.push(new types.ColoredPart(args[i]+" ", locs.first()));
						}
						locs = locs.rest();
					}
				}
				return coloredParts;
			}
			var getLocation = function(pos) {
				var locs = locationList;

				for(var i = 0; i < pos; i++){
					locs = locs.rest();
				}
				return locs.first();
			}


			if(args){
				//console.log("locationlist.rest() is ", locationList.rest());
				//console.log("args is ", args, "and is it an array? ", (args instanceof Array));
				var argColoredParts = getArgColoredParts(locationList.rest());
				//console.log("argColoredParts is ", argColoredParts);


				raise( types.incompleteExn(types.exnFailContract,
							   new types.Message([
							   		new types.ColoredPart(details[0], locationList.first()),
							   		": expects type ",
							   		details[1],
							   		" as ",
							   		details[2], 
							   		" argument, given: ",
							   		new types.ColoredPart(details[3], getLocation(pos)),
							   		"; other arguments were: ",
							   		new types.GradientPart(argColoredParts)
							   	]),
							   []) );
			}
			else {
				raise( types.incompleteExn(types.exnFailContract,
							   new types.Message([
							   		new types.ColoredPart(details[0], locationList.first()),
							   		": expects type ",
							   		details[1],
							   		" as ",
							   		details[2], 
							   		" argument, given: ",
							   		new types.ColoredPart(details[3], getLocation(pos)),
							   	]),
							   []) );
			}


		}
	}