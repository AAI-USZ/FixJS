function(e) {
	var url = $(e.target).attr("data-url");
	var matches = url.match(/\?id=(.*)/);
	if (matches != null) {
		showEvent(matches[1]);
	} else {
		createEvent();
	}
}