function(item, status) {
	this.set("selected", false);
	item.data.object.status = status;
	item.render({"element": "controls"});
	// rerender status recursive
	// since it contains other renderers
	item.render({
		"element": "status",
		"recursive": true
	});
}