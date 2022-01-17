function(i, id) {
				dialog[node_type].unbind("dialogbeforeclose");
				node.attr("id", "node_" + id);
				node.data("jstree", (node_type=='test_case')?LEAF_MENU:FOLDER_MENU);
				$.jstree._reference(node).set_text(node, tc["node[name]"]);
			    }