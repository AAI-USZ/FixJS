function () {
			var body = this.$.body,
				children = body.find("tr:first:not([data-spacer])").children(),
				// getting the outer widths is the most expensive thing
				firstWidths = children.map(function () {
					return $(this).outerWidth()
				}),

				padding = this.$.table.height() >= body.height() ? can.ui.scrollbarWidth() : 0,
				tableWidth = this.$.table.width();

			// TODO auto detect if updateCols needs to be called
			// if(children.length != body.find('tr[data-spacer]:first').children().length) {
			//	this.updateCols();
			// }

			if (tableWidth) {
				if (this.$.foot) {
					var cells = this.$.tfootTable.find("th, td")
					if (cells.length == firstWidths.length) {
						setWidths(cells, firstWidths);
					}
					this.$.foot.css('visibility', 'visible')
					this.$.tfootTable.width(tableWidth + padding)
				}

				if (this.$.head) {
					var cells = this.$.theadTable.find("th, td")
					if (cells.length == firstWidths.length) {
						setWidths(cells, firstWidths);
					}
					this.$.head.css('visibility', 'visible')
					this.$.theadTable.width(tableWidth + padding)
				}
			}
		}