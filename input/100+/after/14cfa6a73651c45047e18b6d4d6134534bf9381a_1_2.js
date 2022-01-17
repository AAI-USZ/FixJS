function resolveTransitionsRecursive(node) {	
				
				if (node.spec.transitions) {
					node.transitions = {};
					F5.forEach(node.spec.transitions, function (arg1, arg2) {
						// handle both the case of an array or an object
						var transition = typeof arg2 === 'object' && arg2 || arg1;
						
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
					});
				}

				// recurse
				if (node.children) {
					F5.forEach(node.children, function (id, child) {
						resolveTransitionsRecursive(child);
					});
				}				
			}