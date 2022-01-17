function() {
		var nodeAndParent,
			node,
			parentNode,
			parentNodeName,
			possibleElements,
			element,
			possibleChildNodesDropdown,
			schemaAttributes,
			dataType,
			translatedCslId,
			translatedNodeInfo,
			translatedParentName;

		if (selectedNode() === -1) {
			// clear property panel if nothing selected
			propertyPanelElement.children().remove();
			return;
		}

		nodeAndParent = CSLEDIT.data.getNodeAndParent(selectedNode());
		node = nodeAndParent.node;
		parentNode = nodeAndParent.parent;

		// hack to stop parent of style being style
		if (node.name === "style") {
			parentNodeName = "root";
		} else if (parentNode !== false) {
			parentNodeName = parentNode.name;
		} else {
			parentNodeName = "root";
		}

		nodePathView.selectNode(getSelectedNodePath());

		// reregister dropdown handler after changes
		setupDropdownMenuHandler("#possibleChildNodes a");

		CSLEDIT.propertyPanel.setup(propertyPanelElement, node, parentNodeName + '/' + node.name);

		syntaxHighlighter.selectedNodeChanged(node.cslId);		
	}