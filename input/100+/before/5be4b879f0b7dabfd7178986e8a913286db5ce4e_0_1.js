function(context) {
			var self = this,
				subContext = this.ctxPath ? context.getSubcontext(this.ctxPath) : undefined;
			
			if (typeof helpers[this.name] !== 'function') {
				throw new Error('No block helper for @' + this.name + ' has been registered');
			}
			
			return helpers[this.name].call(context, subContext, {
				render: function(ctx) {
					return ContainerNode.prototype.render.call(self, ctx, doc);
				},
				
				options: self.options
			});
		}