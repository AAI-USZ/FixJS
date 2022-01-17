function bind_node_event (e, data) {
	$("#testplan-tree").unblock();
	$(this).find("li[rel=test_case]").click(function(e) {
	    var $node = $(this);
	    $("#executions-view").block(impasse_loading_options());
	    show_test_case($(this).attr("id").replace("exec_", ""));
	});
    }