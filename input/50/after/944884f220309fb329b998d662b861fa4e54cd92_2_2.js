function (e) {
			CSLEDIT.controller.exec("deleteNode", [CSLEDIT.viewController.selectedNode()]);
			e.preventDefault();
		}