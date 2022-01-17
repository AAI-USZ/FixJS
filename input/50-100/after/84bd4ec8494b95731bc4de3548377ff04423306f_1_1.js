function(node) { openDialog({
		    rslt: {
			name: $("#testcase-tree").jstree("get_text", node),
			obj: node,
			parent: $(node).parents("li:first")
		    }
		}, 'edit'); }