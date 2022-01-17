function(aState, l, s, c) {
			 check(aState, l, isNonNegativeReal, "square", "non-negative number", 1, arguments);
			 check(aState, s, isMode, "square", "style", 2, arguments);
			 check(aState, c, isColor, "square", "color", 3, arguments);
			 
			 if (colorDb.get(c)) {
			 c = colorDb.get(c);
			 }
			 aState.v =  world.Kernel.squareImage(jsnums.toFixnum(l), s.toString(), c);
			 }