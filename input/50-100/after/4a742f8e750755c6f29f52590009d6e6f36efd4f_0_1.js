function openinstructions(id1,id2){
	
	if(dojo.byId(id2)){
		dojo.removeClass('instructionOuterDiv','hidediv');
		dojo.removeClass('instructionDiv','hidediv');
        dojo.byId('mentor_field_box').style.position = 'inherit';
		dojo.byId('instructionInnerDiv').innerHTML = dojo.byId(id2).innerHTML;
	}
}