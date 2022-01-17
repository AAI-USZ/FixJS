function openinstructions(id1,id2){
	
	if(dojo.byId(id2)){
		dojo.removeClass('instructionOuterDiv','hidediv');
		dojo.removeClass('instructionDiv','hidediv');
		dojo.byId('instructionInnerDiv').innerHTML = dojo.byId(id2).innerHTML;
	}
}