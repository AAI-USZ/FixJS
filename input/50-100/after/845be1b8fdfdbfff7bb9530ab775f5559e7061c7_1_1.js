function Sine(freq, volume) {	
	var that = Gibberish.Sine(freq, volume);
	that.connect(Master);
	that.masters = [];
	that.note = function(freq) { this.frequency = freq; }
	that.note = Gibber.makeNoteFunction(that);
	
	//that.connect(Gibberish.MASTER);
	return that;
}