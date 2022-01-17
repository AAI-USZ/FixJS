function(node) { openDialog({
		    rslt: {
			name: $("#testcase-tree").jstree("get_text", node),
			position: $("#testcase-tree").jstree("get_index", node),
			obj: node,
			parent: $(node).parents("li:first")
		    }
		}, 'edit'); }