function () {
		editorElement.find('span[cslid]').hover(
			function (event) {
				var target = $(event.target).closest("span[cslid]");
				
				// remove all
				removeFromHoveredNodeStack(true);

				// populate hovered node stack
				addToHoveredNodeStack(target);

				var lastNode = hoveredNodeStack[hoveredNodeStack.length - 1];
				assertEqual(lastNode, target.attr("cslid"), "applySyntax");

				if (hoveredNodeStack.length > 0) {
					highlightNode(hoveredNodeStack.slice());
				}
			},
			function () {
				removeFromHoveredNodeStack();
				
				if (hoveredNodeStack.length > 0) {
					highlightNode(hoveredNodeStack.slice());
				} else {
					unHighlightTree();
				}
			}
		);

		// set up click handling
		editorElement.find('span[cslid]').click(function (event) {
			var target = $(event.target).closest("span[cslid]"),
				cslId = parseInt(target.attr('cslId'), 10);
			reverseSelectNode(cslId);
		});

		// set up hovering over tree nodes
		editorElement.find('li[cslid] > a').unbind('mouseenter mouseleave');
		editorElement.find('li[cslid] > a').hover(
			function (event) {
				var target = $(event.target).closest("li[cslid]"),
					cslId = parseInt(target.attr('cslId'), 10);
				highlightOutput(cslId);
			},
			function (event) {
				var target = $(event.target).closest("li[cslid]"),
					cslId = parseInt(target.attr('cslId'), 10);
				unHighlightNode(cslId);
			}
		);
		editorElement.find('li[cslid] > a').hover(
			function (event) {
				var target = $(event.target),
					liElement = target.closest("li[cslid]"),
					cslId = parseInt(liElement.attr('cslId'), 10),
					nodeAndParent = CSLEDIT.data.getNodeAndParent(cslId),
					documentation;
				
				if (nodeAndParent.parent === null) {
					documentation = CSLEDIT.schema.documentation('root/' + nodeAndParent.node.name);
				} else {
					documentation = CSLEDIT.schema.documentation(
						nodeAndParent.parent.name + '/' + nodeAndParent.node.name);
				}

				if (documentation !== "") {
					target.attr("title", nodeAndParent.node.name + "\n\n" + documentation);
				}
			},
			function (event) { /* no-op */ }
		);

	}