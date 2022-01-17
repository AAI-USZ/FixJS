function(){
						
						var oldNodes = nodes,
							insertBefore = nodes[nodes.length - 1].nextSibling; // after the last node
						nodes = makeAndPut(func.call(self), 
							insertBefore);
						//replace oldNodes with new nodes
						$(oldNodes.parent()).append(nodes).find(oldNodes).remove();
					}