function(event) {
	// Prevent the form from submitting normally
	event.preventDefault();

	// Get the data from the searh box and URL encode it
	var query = encodeURI($('#directory-search').val());

	// Make the request pretty
	$.mobile.changePage('search/' + query);
}