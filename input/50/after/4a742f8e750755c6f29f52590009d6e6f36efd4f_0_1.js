function closeInstructionBox(){
	if(dojo.byId('instructionDiv')){
		dojo.addClass('instructionOuterDiv','hidediv');
		dojo.addClass('instructionDiv','hidediv');
        dojo.byId('mentor_field_box').style.position = 'relative';
	}
}