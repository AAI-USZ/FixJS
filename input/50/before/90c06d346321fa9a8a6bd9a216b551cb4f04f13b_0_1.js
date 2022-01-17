function(require) {



	// lets get all the panel handler classes in to variables

	var ListViewPanelHandler = require('./listViewPanel/handler');

	var DetailViewPanelHandler = require('./detailViewPanel/handler');

	

	// now return a structure containing the route path and handler instance

	return {

		'salesPersons/' : new ListViewPanelHandler(),

		'salesPersons/{id}' : new DetailViewPanelHandler()

	};

}