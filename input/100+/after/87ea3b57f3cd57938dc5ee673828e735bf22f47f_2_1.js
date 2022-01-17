function FM(cmRatio, index, attack, decay, shouldUseModulatorEnvelope){
	var that;
	
	if(typeof arguments[0] === "string") { // if a preset
		that = Gibberish.FMSynth( Gibber.FMPresets[arguments[0]] );
	}else if(typeof arguments[0] === "object") {
		that = Gibberish.PolyFM( arguments[0] );
	}else{
		props = {
			cmRatio : isNaN(cmRatio) ?  2 	: cmRatio,
			index  	: isNaN(index)	 ? .9 	: index,
			attack 	: isNaN(attack)  ? 4100 : attack,
			decay  	: isNaN(decay)   ? 4100 : decay,
		};
		
		that = Gibberish.PolyFM( props );
	}
	
	that.note = Gibber.makeNoteFunction(that);
	that.chord = Gibber.chord;	
	
	return that;
}