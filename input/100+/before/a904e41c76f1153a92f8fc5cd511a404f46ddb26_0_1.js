function showEvent(id) {
	var event = $("#section-events").data("Event_" + id);
	$('#input-event-name').val(event.name);
	$('#field-event-name').fieldcontain('refresh');
	$('#input-event-date').val(event.date);
	$('#field-event-date').fieldcontain('refresh');
	$('#input-event-id').val(event.id);
	$('#field-event-id').fieldcontain('refresh');
	$('#input-event-version').val(event.version);
	$('#field-event-version').fieldcontain('refresh');
	$('#input-event-class').val(event.class);
	$('#field-event-class').fieldcontain('refresh');
}