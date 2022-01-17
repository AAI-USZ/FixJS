function () {
			// body acts as a buffer for the scroll bar
			this.$.body.css("width", "100%");

			// get the thead, and tfoot into their own table.
			$.each(['thead', 'tfoot'], can.proxy(this._wrapWithTable, this));


			// get the tbody
			this.$.tbody = this.$.table.children('tbody')

			// if one doesn't exist ... make it
			if (!this.$.tbody.length) {
				this.$.tbody = $('<tbody/>')
				this.$.table.append(this.$.tbody)
			}

			// add thead
			if (this.$.theadTable) {
				this.$.head = $("<div class='header'></div>").css({
					"visibility" : "hidden",
					overflow : "hidden"
				}).prependTo(this.element).append(this.$.theadTable);
				this._addSpacer('thead');
			}
			if (this.$.tfootTable) {
				this.$.foot = $("<div class='footer'></div>").css({
					"visibility" : "hidden",
					overflow : "hidden"
				}).appendTo(this.element).append(this.$.tfootTable);
				this._addSpacer('tfoot');
			}


			// add representations of the header cells to the bottom of the table

			// fill up the parent
			// make the scroll body fill up all other space
			if (this.options.fill) {
				new TableFill(this.$.scrollBody, {
					parent : this.element.parent()
				});
			}

			var thead = this.$.head;
			this.on(this.$.scrollBody, 'scroll', function (ev) {
				thead.scrollLeft($(ev.target).scrollLeft());
			});
			this.on(this.$.table, 'resize', 'resize');

			this.updateCols();
		}