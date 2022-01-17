function () {
		var toolbar = editorElement.find('#treeEditorToolbar'),
			addNodeButton = toolbar.find('button.add'),
			deleteNodeButton = toolbar.find('button.delete');

		assertEqual(addNodeButton.length, 1);
		assertEqual(deleteNodeButton.length, 1);

		addNodeButton.on('click', function () {
			showAddNodeDialog();

		});

		deleteNodeButton.on('click', function () {
			CSLEDIT.controller.exec("deleteNode", [CSLEDIT.viewController.selectedNode()]);
		});
	}