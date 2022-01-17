function Synth(attack, decay, amp) {
	var that;
	if(typeof arguments[0] === "object") {
		that = arguments[0];
		
		that = Gibberish.PolySynth(that);
	}else{
		console.log("ARGGHH");
		that = {};
		if(! isNaN(attack)) that.attack = Math.round(attack * 44.1);
 		if(! isNaN(decay)) that.decay = Math.round(decay * 44.1);
		if(! isNaN(amp)) that.amp = amp;
		that.maxVoices = 1;
		console.log("SYNTH", that);
		that = Gibberish.PolySynth(that);
	}
	
	that.note = Gibber.makeNoteFunction(that);
	that.chord = Gibber.chord;	
	
	that.connect(Master);
	
	return that;
}