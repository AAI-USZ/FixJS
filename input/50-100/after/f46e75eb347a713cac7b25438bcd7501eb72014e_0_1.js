function () {
					CSLEDIT.viewController.setSuppressSelectNode(true);
					executeCommand("addNode",
						[infoNode.cslId, "last", new CSLEDIT.CslNode(item.node)]);
					CSLEDIT.viewController.setSuppressSelectNode(false);
					setupPanel(panel, executeCommand);
				}