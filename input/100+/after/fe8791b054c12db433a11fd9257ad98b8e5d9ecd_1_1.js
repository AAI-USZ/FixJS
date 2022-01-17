function(context) {
			var self = this,
				container = {},
				subContext;
			
			if (typeof this.value !== 'undefined') {
				if (this.value.charAt(0) == '"') {
					// Direct string value
					subContext = context.createContext(this.value.substr(1, this.value.length - 2));
				} else {
					// Context path
					subContext = context.getSubContext(this.value);
				}
			}
			
			if (typeof helpers[this.name] !== 'function') {
				throw new Error('No block helper for @' + this.name + ' has been registered');
			}
			
			container.render = ContainerNode.prototype.render.bind(container);
			container._render = ContainerNode.prototype._render.bind(self);
			
			return helpers[this.name].call(context, subContext, container);
		}