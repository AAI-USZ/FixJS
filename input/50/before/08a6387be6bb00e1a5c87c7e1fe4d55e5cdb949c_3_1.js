function(element) {
	var component = this.component;
	element.click(function() {
		component.events.publish({
			"topic": "onEditError",
			"data": component.prepareBroadcastParams()
		});
	});
}