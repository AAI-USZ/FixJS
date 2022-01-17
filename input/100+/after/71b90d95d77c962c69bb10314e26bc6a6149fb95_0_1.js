function FM(cmRatio, index, attack, decay, shouldUseModulatorEnvelope){
	var that;
	if(typeof Gibber.FMPresets === "undefined") FMPresets();
	
	if(typeof arguments[0] === "string") { // if a preset
		if(typeof arguments[1] === "undefined") {
			that = Gibberish.PolyFM( Gibber.FMPresets[arguments[0]] );
		}else{
			console.log("EXTENDING WITH ", arguments[1]);
			var props = Gibber.FMPresets[arguments[0]];
			Gibberish.extend(props, arguments[1]);
			
			that = Gibberish.PolyFM( props );
		}
	}else if(typeof arguments[0] === "object") {
		that = Gibberish.PolyFM( arguments[0] );
	}else{
		props = {
			cmRatio : isNaN(cmRatio) ?  2 	: cmRatio,
			index  	: isNaN(index)	 ? .9 	: index,
			attack 	: isNaN(attack)  ? 4100 : attack,
			decay  	: isNaN(decay)   ? 4100 : decay,
			maxVoices: 1,
		};
		
		that = Gibberish.PolyFM( props );
	}
	
	that.note = Gibber.makeNoteFunction(that);
	that.chord = Gibber.chord;
	that.connect(Master);	
	
	return that;
}