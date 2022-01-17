function(route) {
	// route for web [deprecated after cms2]
	// if(!wn.boot) {
	// 	return [window.page_name];
	// }
	
	// for app
	return $.map(wn.get_route_str(route).split('/'), 
		function(r) { return decodeURIComponent(r); });
}