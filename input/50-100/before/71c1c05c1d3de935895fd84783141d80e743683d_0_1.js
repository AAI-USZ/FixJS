function(name, e) {
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent(name, true, true, window, 0, e.page.x, e.page.y, e.client.x, e.client.y, false, false, false, false, 0, null);
	event.$valid = true;
	populate(event, e);
	target.dispatchEvent(event);
	return this;
}