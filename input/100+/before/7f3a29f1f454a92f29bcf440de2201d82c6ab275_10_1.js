function (event) {
			var target = $(event.target),
				nodeName = target.attr('data-nodeName'),
				position,
				children = CSLEDIT.data.getNode(CSLEDIT.viewController.selectedNode()).children;

			dialogDiv.dialog('destroy');

			// hard coded constraint for conditional
			// TODO: generalise
			if (nodeName === 'if') {
				position = "first";
			} else if (nodeName === 'else-if' && children[children.length-1].name === "else") {
				position = children.length - 1;
			} else {
				position = "last";
			}

			CSLEDIT.controller.exec("addNode", [
				CSLEDIT.viewController.selectedNode(), position, { name : nodeName, attributes : []}
			]);
		}