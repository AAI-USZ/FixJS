function(){
						// after the last node
						var insertBefore = nodes[nodes.length - 1].nextSibling;
						nodes = makeAndPut(func.call(self), 
							insertBefore, nodes);
					}