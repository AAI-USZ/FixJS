function(require) {

	// now return a structure containing the route path and handler classes
	return {
		'listview/{id}' : require('./listviewPanel/handler'),
		'detailview/{id}' : require('./detailviewPanel/handler')
	};
}