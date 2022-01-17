function (i, tag) {
			// save it
			var el = this.$[tag] = this.$.table.children(tag);
			if (el.length && el.find('td, th').length) {
				var table = $('<table>'), parent = el.parent();
				// We want to keep classes and styles
				table.attr('class', parent.attr('class'));
				table.attr('style', parent.attr('style'));

				// remove it (w/o removing any widgets on it)
				// el[0].parentNode.removeChild(el);

				//wrap it with a table and save the table
				this.$[tag + "Table"] = el.wrap(table).parent();
			}
		}