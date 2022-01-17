function (i, node) {
				var lastCslId = [-1];
				if (node.cslId === newNode.cslId) {
					var newJsTreeNode;
					newJsTreeNode = jsTreeDataFromCslData_inner(newNode, lastCslId);
					createSubTree(ranges[ranges.length-1].rootNode, "after", newJsTreeNode);

					var newTreeNode = treeElement.find('li[cslid="' + newNode.cslId + '"]');
					ranges.push({
						first : newNode.cslId,
						last : newNode.cslId + CSLEDIT.data.numNodes(newNode) - 1,
						rootNode : newTreeNode
					});
					
					return false;
				}
			}