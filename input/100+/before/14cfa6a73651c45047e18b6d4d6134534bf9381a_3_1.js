function (id, transition) {
						var toNode = transition.to;
						var toPath = toNode.path;

						// NOTE: graphviz doesn't support edges between clusters
						// the workaround is to make the edge between leaf nodes
						// then set the edge head or tail to the clusters
						// in this case only the head needs the workaround since the tail
						// is always attached to the transitionSource node
						// see: https://mailman.research.att.com/pipermail/graphviz-interest/2010q3/007276.html						
						var head;
						if (isCluster(toNode)) {
							head = makeClusterLabel(toNode.path);

							while (toNode.children) {
								toNode = getAProperty(toNode.children);
							}
							toPath = toNode.path;

							// if the toNode has transitions, then use one of them
							if (toNode.transitions) {
								toPath = toNode.path + '_' + getAnId(toNode.transitions);
							} 
							// if the toNode is the child of a set then it's a cluster
							// because of the selection button. so grab the button
							else if (toNode.parent.type === 'tabset') {
								toPath = toNode.parent.path + '_' + toNode.id;
							} 
							// if the toNode has subflows then it's a cluster, so grab
							// one of the subflow elements
							else if (toNode.subflows) {
								toPath = toNode.path + '_' + getAnId(toNode.subflows);
							}
						}												
						addEdge(fromNode.path + '_' + id, toPath, head);							
					}