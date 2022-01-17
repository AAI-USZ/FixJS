function(r, status, xhr) {
			    if (r.errors) {
				console.error(r.errors);
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
			}