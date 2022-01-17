function(element) {

			var nodes = element.childNodes;
			for (var i = 0, len = nodes.length; i < len; i++) {

				var node = nodes[i];
				if (node.nodeType !== 1)
					continue;

				var role = node.getRole();
				if (role === null) {
					build(node);
					return;
				}

				var behavior = roles[role] || null;
				if (behavior && behavior instanceof Function) {
					behavior.call(owner, node);

					// stops here if the role created a component with this node
					var component = node.retrieve('moobile:component');
					if (component === null) {
						build(node);
					}

				} else {
					throw new Error('Role ' + role + ' has not beed defined for this component.');
				}
			}
		}