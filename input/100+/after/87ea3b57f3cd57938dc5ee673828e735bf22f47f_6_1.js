function Synth(attack, decay, amp) {
	var that;
	if(typeof arguments[0] === "object") {
		that = arguments[0];
		
		that = Gibberish.PolySynth(that);
	}else{
		that = {};
		if(! isNaN(attack)) that.attack = attack;
		if(! isNaN(decay)) that.decay = decay;
		if(! isNaN(amp)) that.amp = amp;
		
		that = Gibberish.PolySynth(that);
	}
	
	that.note = Gibber.makeNoteFunction(that);
	that.chord = Gibber.chord;	
	
	return that;
}