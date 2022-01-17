function(route) {
	// route for web
	if(!wn.boot) {
		return [window.page_name];
	}
	
	// for app
	return $.map(wn.get_route_str(route).split('/'), 
		function(r) { return decodeURIComponent(r); });
}