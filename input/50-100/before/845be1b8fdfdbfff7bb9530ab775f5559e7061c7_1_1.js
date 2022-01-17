function Sine(freq, volume) {	
	var that = Gibberish.Sine(freq, volume);
	that.connect(Master);//Osc.apply(null, arguments);
	that.masters = [];
	
	//that.connect(Gibberish.MASTER);
	return that;
}