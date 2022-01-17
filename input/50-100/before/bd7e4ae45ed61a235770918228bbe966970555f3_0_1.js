function(Backbone, _, $) {
    "use strict";

    var spinner = new Backbone.UI.Spinner({
		el : $('.sp_example'),
		settings : {
			value : 600,
			max : 3300,
			type : 'integer',
			disabled : false
		}
	});
}