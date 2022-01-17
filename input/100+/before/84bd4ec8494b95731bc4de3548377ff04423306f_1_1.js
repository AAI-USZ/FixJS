function(e) {
		    var tc = {format:"json"};
		    dialog[node_type].find(":input:hidden,:text,textarea,:checkbox:checked,radiobutton:checked,select").each(function() {
			tc[$(this).attr("name")] = $(this).val();
		    });
		    if (edit_type == 'edit')
			tc["node[id]"] = node.attr("id").replace("node_","");
		    tc["node_type"] = node_type;
		    tc["node[parent_id]"] = $(data.rslt.parent).attr("id").replace("node_", "");
		    tc["node[node_order]"] = data.rslt.position;
		    $.ajax({
			type: 'POST',
			url:AJAX_URL[edit_type],
			data: tc,
			success: function(r, status, xhr) {
			    if (r.errors) {
				var ul = $("<ul/>");
				$.each(r.errors, function(i, error) {
				    ul.append($("<li/>").html(error));
				});
				$("#errorExplanation", dialog[node_type])
				    .html(ul)
				    .show();
				var top = $("#errorExplanation", dialog[node_type]).position().top;
				$(window).scrollTop(top);
				return;
			    }
			    $.each(r, function(i, n) {
				dialog[node_type].unbind("dialogbeforeclose");
				node.attr("id", "node_" + n.id);
				node.data("jstree", (node_type=='test_case')?LEAF_MENU:FOLDER_MENU);
				$.jstree._reference(node).set_text(node, tc["node[name]"]);
				show_notification_dialog(
				    'success',
				    edit_type=='edit' ? IMPASSE.label.noticeSuccessfulUpdate : IMPASSE.label.noticeSuccessfulCreate);
			    });
			    dialog[node_type].dialog('close');
			},
			error: ajax_error_handler
		    });
		}