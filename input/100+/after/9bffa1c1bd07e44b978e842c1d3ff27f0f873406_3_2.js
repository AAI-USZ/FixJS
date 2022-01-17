function setupTree($tree) {
		$tree.children().remove();
		
		if (! currentEventTrace) { return; }

		if (! currentEventTrace.children || currentEventTrace.children.length === 0) {
			$tree.text("Empty");
			return;
		}

		// Mostly taken from Brackets' ProjectManager.js
		$tree.jstree({
			core : { animation: 0 },
			plugins : ["ui", "themes", "json_data"],
			json_data : { data: _treeDataProvider, correct_state: false },
			themes : { theme: "brackets", url: "styles/jsTreeTheme.css", dots: false, icons: false }
		})
		.bind("mousedown.jstree", function (event) {
			event.preventDefault();
			if ($(event.target).is(".jstree-icon")) { return; }
			onTraceSelected($(event.target).closest('li').data('trace'));
		});
		
		// .bind("before.jstree", function (event, data) {
		// 	console.log("before.jstree");
		// })
		// .bind("select_node.jstree", function (event, data) {
		// 	console.log("select_node.jstree");
		// })
		// .bind("reopen.jstree", function (event, data) {
		// 	console.log("reopen.jstree");
		// })
		// .bind("scroll.jstree", function (e) {
		// 	console.log("scroll.jstree");
		// })
		// .bind("loaded.jstree open_node.jstree close_node.jstree", function (event, data) {
		// 	console.log(event.type + ".jstree");
		// })
	}