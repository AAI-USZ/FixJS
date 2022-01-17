function removeRow(tableId, anElementInRow) {

	var className = 'repeating_table_' + tableId;

	var row = findParentWithClass(anElementInRow, className);

	if (row) {

		row.style.display = 'none';

		var flags = getElementsByClass(row, 'visibleFlag');

		if (flags.length > 0)

			flags[0].value = 'false';

	}

}