function () {
	// Check what page we are currently displaying.
	var params = get_params();
	if(params.type == 'undelegated') {
		add_nameserver();
	} else if(tree_view != undefined && tree_view) {
		hide_results();
	} 
}