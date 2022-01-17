function() {
			var instance = this;

			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
			var displayRowsCount = Math.ceil(displayDaysInterval / WEEK_LENGTH);

			var rowHeight = 100 / displayRowsCount;

			for (var i = 0; i < displayRowsCount; i++) {
				var tableGridNode = instance._getTableGridNode(i);

				var rowNode = A.Node.create(
					Lang.sub(
						TPL_SVT_ROW,
						{
							height: rowHeight,
							top: rowHeight * i
						}
					)
				);

				rowNode.append(
					tableGridNode.toggleClass(CSS_SVT_TABLE_GRID_FIRST, (i === 0))
				);

				instance[TABLE_ROWS].push(rowNode);
			}

			instance._renderEventsOverlay();

			instance[COL_HEADER_DAYS_NODE].appendTo(instance[COLUMN_DAY_HEADER]);
			instance[TABLE_ROWS].appendTo(instance[TABLE_ROW_CONTAINER]);
		}