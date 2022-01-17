function(context) {
			var self = this,
				container = {},
				subContext;
			
			if (typeof helpers[this.name] !== 'function') {
				throw new Error('No block helper for @' + this.name + ' has been registered');
			}
			
			if (typeof this.path !== 'undefined') {
				subContext = context.getSubcontext(this.path);
			} else if (typeof this.value !== 'undefined') {
				subContext = context.createContext(this.value);
			}
			
			container.render = ContainerNode.prototype.render.bind(container);
			container._render = ContainerNode.prototype._render.bind(self);
			
			return helpers[this.name].call(context, subContext, container);
		}