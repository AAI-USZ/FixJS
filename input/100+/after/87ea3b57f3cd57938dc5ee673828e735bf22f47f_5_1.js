function Pluck (damping, blend, amp, color){
	var that;
	
	if(typeof arguments[0] === "object") {
		that = Gibberish.PolyKarplusStrong( arguments[0] );
	}else{
		var props = {
			damping : (isNaN(damping)) ? 0 : damping / 100,
			blend	: (isNaN(blend)) ? 1 : blend,
			amp		: amp || .5,
		};
		
		that = Gibberish.PolyKarplusStrong( props );
	}
	
	that.note = Gibber.makeNoteFunction(that);
	that.chord = Gibber.chord;	
	
	return that;
}