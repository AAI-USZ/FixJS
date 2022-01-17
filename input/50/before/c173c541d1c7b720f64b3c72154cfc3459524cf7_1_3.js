function(aState, symb) {
		 	check(aState, aState, symb, isSymbol, 'symbol->string', 'symbol', 1);
			aState.v =  types.string(symb.toString());
		 }