function(type, e) {
			var i = 0,
				index = 0,
				localIndex,
				sections = this._sections.children,
				row = this._tableViewRowClicked,
				section = this._tableViewSectionClicked;

			if (row && section) {
				if (regexpClickTap.test(type)) {
					for (; i < sections.length; i += 2) {
						localIndex = sections[i]._rows.children.indexOf(row);
						if (localIndex !== -1) {
							index += Math.floor(localIndex / 2);
							break;
						} else {
							index += sections[i].rowCount;
						}
					}
					e.row = e.rowData = row;
					e.index = index;
					e.section = section;
					e.searchMode = false; 
				}

				View.prototype._handleTouchEvent.apply(this, arguments);

				this._tableViewRowClicked = null;
				this._tableViewSectionClicked = null;
			}
		}