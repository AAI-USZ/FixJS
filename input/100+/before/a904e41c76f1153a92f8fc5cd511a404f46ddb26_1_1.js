function() {
	var template = '{#events}<li><a href="#section-show-event?id={id}" data-transition="fade">{name};{date}</a></li>{/events}';
	var compiled = dust.compile(template, "intro");
	dust.loadSource(compiled);
	var context = this.events;
	dust.render("intro", context, function(err, out) {
		$("#list-events").append(out);
		for ( var i = 0; i < context.events.length; i++) {
			var event = context.events[i];
			$("#section-events").data('Event_' + event.id, event);
		}
		$('#list-events').listview('refresh');
	});
}