function() {
	var elem = this[0], layers;
	if (!elem || !elem.getContext) {
		layers = [];
	} else {
		layers = getCanvasData(elem).layers;
	}
	return layers;
}