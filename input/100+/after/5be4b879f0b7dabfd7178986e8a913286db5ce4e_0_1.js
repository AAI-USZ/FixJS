function(context) {
			var self = this,
				subContext = this.ctxPath ? context.getSubcontext(this.ctxPath) : undefined,
				container = {};
			
			if (typeof helpers[this.name] !== 'function') {
				throw new Error('No block helper for @' + this.name + ' has been registered');
			}
			
			container.render = ContainerNode.prototype.render.bind(container);
			container._render = ContainerNode.prototype._render.bind(self);
			
			return helpers[this.name].call(context, subContext, container, this.options);
		}