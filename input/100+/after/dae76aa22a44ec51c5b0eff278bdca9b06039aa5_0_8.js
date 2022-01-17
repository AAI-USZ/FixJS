function(context) {
			var index,
				self = this,
				parent = self.parent,
				tmpl = self.tmpl = getTemplate(self.tmpl);

			if (parent) {
				index = !parent._useKey && self.index,
				// Remove HTML nodes
				$(self.nodes).remove(); // Also triggers cleanData which removes child views.
				// Remove child views
				self.removeViews();
				self.nodes = [];

				renderAndLink(self, index, parent.views, self.data,
					tmpl.render(self.data, context, self, TRUE, self._useKey), 
					// Pass in self._useKey as test for layout template (which corresponds to when self._useKey>0 and self.data is an array) 
					context
				);
				setArrayChangeLink(self);
			}
			return self;
		}