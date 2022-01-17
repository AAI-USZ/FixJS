function(data, xhr) {
						$.each(data, function(nodeId, nodeData) {
							var node = self.getNodeByID(nodeId);

							// If no node data is given, assume the node has been removed
							if(!nodeData) {
								self.jstree('delete_node', node);
								return;
							}

							// Check if node exists, create if necessary
							if(node.length) {
								self.updateNode(node, nodeData.html, nodeData);
								setTimeout(function() {
									self.jstree('deselect_all');
									self.jstree('select_node', node);
									// Manually correct state, which checks for children and
									// removes toggle arrow (should really be done by jstree internally)
									self.jstree('correct_state', node);	
								}, 500);
							} else {
								includesNewNode = true;
								self.createNode(nodeData.html, nodeData, function(newNode) {
									self.jstree('deselect_all');
									self.jstree('select_node', newNode);
									// Manually remove toggle node, see above
									self.jstree('correct_state', newNode);
								});
							}
						});

						if(!includesNewNode) {
							self.jstree('deselect_all');
							self.jstree('reselect');
							self.jstree('reopen');
						}
					}