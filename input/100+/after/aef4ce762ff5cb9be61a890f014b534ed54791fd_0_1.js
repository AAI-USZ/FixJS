function (cslData, _callbacks) {
		var eventName,
			jsTreeData,
			citationNodeId,
			citationNodeData,
			citationTree,
			cslId,
			nodes,
			table,
			row;

		treesLoaded = 0;
		treesToLoad = 0;

		selectedNodeId = -1;
		views = [];

		views.push(new CSLEDIT.Titlebar(titlebarElement));

		callbacks = _callbacks;

		nodeButtons = [];
		
		treeView.html('');
		$.each(smartTreeSchema, function (index, value) {
			table = $('');//<table></table>');
			row = $('');//<tr></tr>');
			if (typeof value.buttons !== "undefined") {
				$.each(value.buttons, function (i, button) {
					var buttonElement;
					switch (button.type) {
						case "cslNode":
							nodes = CSLEDIT.data.getNodesFromPath(button.node, cslData);
							if (nodes.length > 0) {
								cslId = nodes[0].cslId;
							} else {
								cslId = -1;
							}
				
							buttonElement = $('<div class="cslNodeButton"></div>');
							views.push(new CSLEDIT.EditNodeButton(buttonElement, button.node, cslId,
								CSLEDIT.options.get("rootURL") + button.icon, function (cslId, selectedView) {
									selectedTree = selectedView;
									selectedNodeId = cslId;

									// deselect nodes in trees
									$.each(views, function (i, view) {
										if ("deselectAll" in view) {
											view.deselectAll();
										}
									});

									selectedNodeChanged();
								}));
							break;
						case "custom":
							buttonElement = $('<button class="customButton">' + 
									button.text + '</button>');
							buttonElement.on('click', button.onClick);
							break;
						default:
							assert(false);
					}
					buttonElement.appendTo(treeView);
				});
			}
			$('<h3>%1</h3>'.replace('%1', value.name)).appendTo(treeView);
			row = $('<div id="%1"></div>'.replace('%1', value.id));
			row.appendTo(treeView);
			treeView.append($('<div class=spacer></div>'));
		});

		$.each(smartTreeSchema, function (index, value) {
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
		});

		nodePathView = new CSLEDIT.NodePathView(nodePathElement, {
			selectNodeFromPath : selectNodeFromPath
		});
	}