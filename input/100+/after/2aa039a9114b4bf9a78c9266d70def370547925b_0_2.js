function(page) {
			var self = this;
			if (self.children_node) {
				self.children_node.element().remove();
			}
			var children_node = new ChildrenNode(page.children());
			self.location.append(children_node.element());
			page.bind('entry_added', function(entry, position) {
				if (entry.is_page()) {
					children_node.add_page(entry, position);
				}
			});
			page.bind('removed_entry', function(entry) {
				if (entry.is_page()) {
					children_node.remove_page(entry);
				}
			});

			page.watch('slug', function(title) {
				self.navigation_current.set_title(title);
			});

			page.title_field().watch('value', function(title) {
				Spontaneous.set_browser_title(title);
			});

			self.children_node = children_node;
		}