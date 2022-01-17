function () {
						executeCommand("deleteNode", [node.cslId]);
						setupPanel(panel, executeCommand);
					}