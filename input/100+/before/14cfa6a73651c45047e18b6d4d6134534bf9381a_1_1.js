function (transition) {
						var id;
						if (typeof transition === 'object') {
							if (transition.id) {
								id = transition.id;
							} else {
								id = transition.to;								
							}
							node.transitions[id] = {to: findNodeUp(node, transition.to), animation: transition.animation};
						} else {
							id = transition;
							node.transitions[id] = {to: findNodeUp(node, id)};						
						}

						// break cycles
						if (!node.transitions[id].to.transitions) {
							resolveTransitionsRecursive(node.transitions[id].to);							
						}						
					}