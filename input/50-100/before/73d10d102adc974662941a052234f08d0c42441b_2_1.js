function (index, value) {
			var tree;
			treesToLoad++;
			tree = CSLEDIT.SmartTree(treeView.children("#" + value.id), value.nodePaths, 
				value.macroLinks);

			// Use this for debugging if you're not sure the view accurately reflects the data
			//tree.setVerifyAllChanges(true);
			tree.setCallbacks({
				loaded : treeLoaded,
				selectNode : selectNodeInTree(tree),
				moveNode : callbacks.moveNode,
				deleteNode : callbacks.deleteNode,
				checkMove : callbacks.checkMove
			});
			tree.createTree();
			views.push(tree);
		}