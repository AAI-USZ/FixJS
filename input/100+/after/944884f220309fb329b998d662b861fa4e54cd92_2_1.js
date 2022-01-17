function () {
		var toolbar = editorElement.find('#treeEditorToolbar'),
			addNodeButton = toolbar.find('a.add'),
			deleteNodeButton = toolbar.find('a.delete');

		assertEqual(addNodeButton.length, 1);
		assertEqual(deleteNodeButton.length, 1);

		addNodeButton.on('click', function (e) {
			showAddNodeDialog();
			e.preventDefault();
		});

		deleteNodeButton.on('click', function (e) {
			CSLEDIT.controller.exec("deleteNode", [CSLEDIT.viewController.selectedNode()]);
			e.preventDefault();
		});
	}