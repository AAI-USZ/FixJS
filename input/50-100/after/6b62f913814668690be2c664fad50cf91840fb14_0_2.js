function () {
	// Check what page we are currently displaying.
	var params = get_params();
	// Add a couple of name server fields by default
	if(params.type != undefined && params.type.match(/undelegated|moved/)) {
		add_nameserver();
		add_nameserver();
	} 
	// initialize the result tree	
	else if(tree_view) {
		initialize_tree();
	}
}