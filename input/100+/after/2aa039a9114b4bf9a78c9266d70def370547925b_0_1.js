function(page, position) {
			var self = this
			, option = self.option_for_entry(page)
			, container = page.container
			, name = container.name()
			, children = self.children
			, optgroup = self.select.find('optgroup[label="'+name+'"]')
			if (optgroup.length === 0) {
				optgroup = this.optgroup(name);
				this.select.append(optgroup);
			}
			optgroup.prepend(option);
			// since the navigation lists are ordered differently from the entries, it's
			// difficult to insert into the right position
			// TODO: re-sort the this.children entries and use this list to find the position in the select

			// happens when we're adding the first item
			if (!children[name]) { children[name] = []; }

			if (position === -1) {
				children[name].push(page)
			} else {
				children[name].splice(position, 0, page)
			}
			self.update_status();
		}