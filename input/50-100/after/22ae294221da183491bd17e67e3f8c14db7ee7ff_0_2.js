function(event) {
	// Prevent the form from submitting normally
	event.preventDefault();

	// Keep jQuery Mobile from removing the href (this was a PITA to figure out. thanks for the help @borkweb)
	event.stopPropagation();

	// Get the url from the link
	var url = $(this).attr('href');

	// Get the data from the hidden input
	var eventData = $(this).find('input[name=event-details]').serialize();

	// Make the request pretty
	$.mobile.changePage( url, {
		type: "post",
		data: eventData
	});
}