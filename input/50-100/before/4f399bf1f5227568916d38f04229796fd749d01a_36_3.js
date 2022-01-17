function swapChars(chars, levels){
	// summary:
	//		Swap characters with symmetrical mirroring as all kinds of parenthesis.
	//		(When needed).
	// chars:
	//		The source string as Array of characters.
	// levels:
	//		An array (like hash) of flags for each character in the source string,
	//		that defines if swapping should be applied on the following character.
	// description:
	//		First checks if the swapping should be applied, if not returns, else 
	//		uses the levels "hash" to find what characters should be swapped.
	// tags:
	//		private	

	if(bdx.hiLevel == 0 || bdx.swap.substr(0, 1) == bdx.swap.substr(1, 2)){
		return;
	};

	//console.log("bdx.hiLevel == 0: " + bdx.hiLevel + "bdx.swap[0]: "+ bdx.swap[0] +" bdx.swap[1]: " +bdx.swap[1]);
	for(var i = 0; i < chars.length; i++){
		if(levels[i] == 1){chars[i] = getMirror(chars[i]);}
	}
}