function(data) {
		if (data.errors) {
		    if ($("#issue-dialog .errorExplanation").size() == 0)
			$("#issue-dialog").prepend($("<div/>").addClass("errorExplanation").attr("id", "errorExplanation"));
		    var list = $("<ul/>");
		    $.each(data.errors, function(i, msg) {
			list.append($("<li/>").text(msg));
		    });
		    $("#issue-dialog #errorExplanation").html(list);
		    return;
		}
		var bugs = $("#execution-bugs-list");
		 
		if (bugs)
		    bugs.append(",");
		bugs.append($("<a/>")
			    .attr("href", IMPASSE.url.issue + "/" + data['issue_id'])
			    .text("#" + data['issue_id']))
		    .parents("p:first").show();
		$("#issue-dialog").dialog("close");
	    }