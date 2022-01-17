function (i, tag) {
			// save it
			this.$[tag] = this.$.table.children(tag);
			if (this.$[tag].length && this.$[tag].find('td, th').length) {
				var table = $('<table>'), parent = this.$[tag].parent();
				// We want to keep classes and styles
				table.attr('class', parent.attr('class'));
				table.attr('style', parent.attr('style'));

				// remove it (w/o removing any widgets on it)
				this.$[tag][0].parentNode.removeChild(this.$[tag][0]);

				//wrap it with a table and save the table
				this.$[tag + "Table"] = this.$.thead.wrap(table).parent()
			}
		}