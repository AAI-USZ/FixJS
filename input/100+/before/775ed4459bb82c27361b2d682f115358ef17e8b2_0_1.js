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
		var bugs = $("#execution-bugs-list").text();
		bugs += (bugs == "" ? "#" : ",#") + data['issue_id'];
		$("#execution-bugs-list").html(bugs)
		    .parents("p:first").show();
		$("#issue-dialog").dialog("close");
	    }