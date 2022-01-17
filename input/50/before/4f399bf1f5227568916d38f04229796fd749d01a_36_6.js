function LamAlef(alef){
	// summary:
	//		If the alef variable is an ARABIC ALEF letter,
	//		return the LamAlef code associated with the specific 
	//		alef character.
	// alef:
	//		The alef code type.
	// description:
	//		If "alef" is an ARABIC ALEF letter, identify which alef is it,
	//		using AlefTable, then return the LamAlef associated with it.
	// tags:
	//		private			
	for(var i = 0; i < AlefTable.length; i++){
		if(AlefTable[i] == alef){
			return AlefTable[i];
		}
	}
	return 0;
}