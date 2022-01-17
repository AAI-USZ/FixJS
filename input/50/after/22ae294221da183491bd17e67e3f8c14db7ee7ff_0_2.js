function(event) {
	// Prevent the form from submitting normally
	event.preventDefault();

	// Keep jQuery Mobile from removing the href (this was a PITA to figure out. thanks for the help @borkweb)
	event.stopPropagation();

	// Get the data from the searh box and URL encode it
	var query = encodeURI($('#directory-search').val());

	// Make the request pretty
	$.mobile.changePage('search/' + query);
}