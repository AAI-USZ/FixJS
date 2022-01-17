function (event) {
			var target = $(event.target),
				nodeName = target.attr('data-nodeName'),
				position,
				children = CSLEDIT.data.getNode(CSLEDIT.viewController.selectedNode()).children;

			dialogDiv.dialog('destroy');

			position = "last";
			// override position for certain nodes
			// TODO: generalise
			if (nodeName === 'if') {
				position = "first";
			} else if (nodeName === 'else-if' && children[children.length-1].name === "else") {
				position = children.length - 1;
			} else if (nodeName === 'macro') {
				position = "last";
				// put it before the citation node:
				$.each(children, function (i, child) {
					if (child.name === "citation") {
						position = i;
						return false;
					}
				});
			}

			CSLEDIT.controller.exec("addNode", [
				CSLEDIT.viewController.selectedNode(), position, { name : nodeName, attributes : []}
			]);
		}