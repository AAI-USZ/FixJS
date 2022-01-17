function getCanvasData(elem) {
	var data = $.data(elem, 'jCanvas');
	// Create event cache if it does not already exist
	if (!data) {
		data = $.data(elem, 'jCanvas', {
			layers: [],
			intersects: [],
			drag: {},
			event: {}
		});
	}
	return data;
}