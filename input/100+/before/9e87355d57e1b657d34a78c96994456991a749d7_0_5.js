function(rowIndex) {
			var instance = this;

			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			var tableGridNode = instance[TABLE_GRID_NODE].item(rowIndex);
			var firstRowNode = tableGridNode.one(TR);

			for (var i = 0; i < Math.min(displayDaysInterval, WEEK_LENGTH); i++) {
				var columnNode = A.Node.create(TPL_SVT_GRID_COLUMN);

				firstRowNode.append(columnNode);

				instance[COLUMN_TABLE_GRID].push(columnNode);
			}

			return tableGridNode;
		}