function(e) {
	    var $node = $(this);
	    $("#executions-view").block(impasse_loading_options());
	    show_test_case($(this).attr("id").replace("exec_", ""));
	}