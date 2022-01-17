function Pluck (damping, blend, amp, color){
	var that = {};
	console.log(0);
	if(typeof arguments[0] === "object") {
		that = Gibberish.PolyKarplusStrong( arguments[0] );
	}else{
		var props = {
			damping : (isNaN(damping)) ? 0 : damping / 100,
			blend	: (isNaN(blend)) ? 1 : blend,
			amp		: amp || .5,
			maxVoices: 1,
		};
		
		that = Gibberish.PolyKarplusStrong( props );
	}
	console.log(1);
	that.note = Gibber.makeNoteFunction(that);
	that.chord = Gibber.chord;
	console.log(2);
	that.connect(Master);	
	
	return that;
}