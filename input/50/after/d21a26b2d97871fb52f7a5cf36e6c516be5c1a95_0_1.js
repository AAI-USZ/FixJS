function(parent, id) {
	var element = $("#" + id, $(parent)).get(0);
	if (!element) {
		this.error('Element ' + id + ' not found from page.');
	}
	return element;
}