function() {
			var instance = this;

			var displayRowsCount = instance._getDisplayRowsCount();

			for (var rowIndex = 0; rowIndex < displayRowsCount; rowIndex++) {
				instance[TABLE_ROWS].push(
					instance.buildGridRowNode(rowIndex)
				);
			}

			instance._renderEventsOverlay();

			instance[COL_HEADER_DAYS_NODE].appendTo(instance[COLUMN_DAY_HEADER]);
			instance[TABLE_ROWS].appendTo(instance[TABLE_ROW_CONTAINER]);
		}