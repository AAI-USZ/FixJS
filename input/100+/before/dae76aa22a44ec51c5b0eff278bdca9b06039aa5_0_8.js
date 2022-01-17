function(context) {
			var self = this,
				parent = self.parent,
				index = !parent._useKey && self.index,
				tmpl = self.tmpl = getTemplate(self.tmpl);

			if (parent) {
				// Remove HTML nodes
				$(self.nodes).remove(); // Also triggers cleanData which removes child views.
				// Remove child views
				self.removeViews();
				self.nodes = [];

				renderAndLink(self, index, parent.views, self.data, tmpl.render(self.data, context, undefined, TRUE, self), context);
				setArrayChangeLink(self);
			}
			return self;
		}