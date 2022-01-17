function() {
	var context = this.events;
	for ( var i = 0; i < context.events.length; i++) {
		var event = context.events[i];
		addEventOnSection(event);
	}
	$('#list-events').listview('refresh');
}