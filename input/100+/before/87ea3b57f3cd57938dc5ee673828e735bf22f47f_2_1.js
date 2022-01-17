function FM(cmRatio, index, attack, decay, shouldUseModulatorEnvelope){
	var that;
	
	if(typeof arguments[0] === "string") { // if a preset
		that = Gibberish.FMSynth( Gibber.FMPresets[arguments[0]] );
	}else{
		props = {
			cmRatio : isNaN(cmRatio) ?  2 	: cmRatio,
			index  	: isNaN(index)	 ? .9 	: index,
			attack 	: isNaN(attack)  ? 100 	: attack,
			decay  	: isNaN(decay)   ? 100 	: decay,
		};
		
		that = Gibberish.FMSynth( props );
	}
	
	that.note = Gibber.makeNoteFunction(that);
	
	return that;
}