function(page) {
			if (this.children_node) {
				this.children_node.element().remove();
			}
			var children_node = new ChildrenNode(page.children());
			this.location.append(children_node.element());
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
				this.navigation_current.set_title(title);
			}.bind(this));

			page.title_field().watch('value', function(title) {
				Spontaneous.set_browser_title(title);
			});

			this.children_node = children_node;
		}