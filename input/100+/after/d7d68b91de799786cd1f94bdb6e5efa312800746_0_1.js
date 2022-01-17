function Flanger(rate, amount, feedback, offset) {
	var that = {
		rate: (typeof rate !== "undefined") ? rate : .1,
		amount: (typeof amount !== "undefined") ? amount : 125,
		feedback:	isNaN(feedback) ? .5 : feedback,
		offset:		isNaN(offset) ? 125 : offset,
	}
	
	that = Gibberish.Flanger(that);
	
	return that;
}