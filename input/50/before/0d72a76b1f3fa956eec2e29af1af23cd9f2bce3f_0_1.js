function(data) {
			    $.unblockUI();
			    $("#issue-dialog").empty().append(data).dialog({
				modal:true,
				minWidth: 800,
				title: IMPASSE.label.issueNew
			    });
			}