function(e) {
		// only do activation stuff if the cell don't has the focus
		if (!this.hasFocus) {
			// set an internal flag to focus the table
			this.tableObj.focus();

			// add an active-class
			this.obj.addClass('aloha-table-cell_active');

			// set the focus flag
			this.hasFocus = true;

			// unset the selection type
			this.tableObj.selection.selectionType = 'cell';

		}
	}