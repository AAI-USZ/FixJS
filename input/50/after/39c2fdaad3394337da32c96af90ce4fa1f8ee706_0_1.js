function(e) {
	$("#testplan-tree").block(impasse_loading_options());
	$tree.jstree("refresh", -1);
	return false;
    }