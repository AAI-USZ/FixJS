function(html) {
		$("#executions-view").empty().append($(html));
		$("span.label", $("#executions-view"))
		    .css({cursor:'pointer'})
		    .click(function(e) {
			$(this).prev().attr("checked", "checked");
		    });
	    }