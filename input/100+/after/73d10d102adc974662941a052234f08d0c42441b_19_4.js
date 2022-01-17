function (parentId, position, newNode, nodesAdded) {
		var id,	parentNode,	thisRangeIndex,	currentCslId, range,
			matchingCslNodes, newTreeNode;

		id = newNode.cslId;

		// note: no two ranges are expected to have the same parent id
		thisRangeIndex = rangeIndex(parentId);

		// shift ranges
		$.each(ranges, function (index, range) {
			shiftCslIds(range, id, nodesAdded);
			
			// if adding to the end of a range, expand the range
			if (thisRangeIndex === index && id > range.last) {
				range.last += nodesAdded;
			}
		});

		if (enableMacroLinks) {
			macroLinksAddNode(parentId, position, newNode, nodesAdded);
		}

		if (thisRangeIndex === -1) {
			matchingCslNodes = [];
			// check if the new node belongs to this smartTree
			$.each(nodePaths, function (i, path) {
				matchingCslNodes = matchingCslNodes.concat(CSLEDIT.data.getNodesFromPath(path));
			});

			$.each(matchingCslNodes, function (i, node) {
				var lastCslId = [-1];
				if (node.cslId === newNode.cslId) {
					var newJsTreeNode;
					newJsTreeNode = jsTreeDataFromCslData_inner(newNode, lastCslId);
					createSubTree(-1, "last", newJsTreeNode);
					
					var newTreeNode = treeElement.find('li[cslid="' + newNode.cslId + '"]');
					ranges.push({
						first : newNode.cslId,
						last : newNode.cslId + CSLEDIT.data.numNodes(newNode) - 1,
						rootNode : newTreeNode
					});
					
					return false;
				}
			});

			return;
		}
		range = ranges[thisRangeIndex];

		parentNode = treeElement.find('li[cslid="' + parentId + '"][macrolink!="true"]');
		assertEqual(parentNode.length, 1);
		
		if (!pathContainsLeafNode(CSLEDIT.data.getNodePath(newNode.cslId))) {
			createSubTree(parentNode, position, jsTreeDataFromCslData_inner(newNode, [id]));
			macroLinksUpdateNode(newNode.cslId, newNode);
		}
		verifyTree();
	}