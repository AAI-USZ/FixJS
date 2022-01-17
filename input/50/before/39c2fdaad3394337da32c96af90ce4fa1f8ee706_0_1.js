function(e) {
	$tree.jstree("refresh", -1);
	$("#testplan-tree").block(impasse_loading_options());
	return false;
    }