function(aState, args) {
		     arrayEach(args, function(x, i) {check(aState, x, isNumber, '*', 'number', i+1, args);});

		     var result = types.rational(1);
		     for(var i = 0; i < args.length; i++) {
			  result = jsnums.multiply(args[i], result);
		     }
		     aState.v =  result;
		 }