function (node, callback) {
						if (that.repositoryManager) {
							that.jstree_callback = callback;
							that._fetchSubnodes(node, callback);
						} else {
							callback();
						}
					}