function getLamAlefFE(alef06, LamAlefForm){
	for(var i = 0; i < AlefTable.length; i++){
		if(alef06 == AlefTable[i]){
			return LamAlefForm[i];
		}
	}
	return alef06;
}