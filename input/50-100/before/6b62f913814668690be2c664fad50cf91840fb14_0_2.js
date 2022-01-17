function () {
	// Check what page we are currently displaying.
	var params = get_params();
	if(params.type == 'undelegated') {
		add_nameserver();
		add_nameserver();
	} else if(tree_view) {
		hide_results();
	}
}