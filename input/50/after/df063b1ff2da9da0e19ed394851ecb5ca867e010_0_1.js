function (nodes, callback) {
						if (that.repositoryManager) {
							that.jstree_callback = callback;
							that._fetchSubnodes(nodes, callback);
						} else {
							callback();
						}
					}