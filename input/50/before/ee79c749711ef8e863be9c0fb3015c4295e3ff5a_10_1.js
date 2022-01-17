function(require) {



	// now return a structure containing the route path and handler instance

	return {

		'salespersons/' : require('./listViewPanel/handler'),

		'salespersons/{id}' : require('./detailViewPanel/handler')

	};

}