function(context) {
			var self = this,
				container = {},
				subContext, ret;
			
			if (typeof helpers[this.name] !== 'function') {
				throw new Error('No block helper for @' + this.name + ' has been registered');
			}
			
			if (typeof this.expr !== 'undefined') {
				try {
					subContext = context.createContext(context.evaluate(this.expr));
				} catch(err) {
					throw this.completeError(err);
				}
			}
			
			container.render = ContainerNode.prototype.render.bind(container);
			container._render = ContainerNode.prototype._render.bind(self);
			
			try {
				ret = helpers[this.name].call(context, subContext, container);
			} catch (err) {
				throw this.completeError(err);
			}
			
			if (typeof ret === 'undefined') {
				return context.createDocumentFragment();
			}
			
			return ret;
		}