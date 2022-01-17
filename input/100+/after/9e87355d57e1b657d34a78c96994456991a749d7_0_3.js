function(rowStartDate, rowEndDate) {
			var instance = this;
			var displayRows = instance.get(DISPLAY_ROWS);

			var intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart());

			var cacheKey = String(intervalStartDate.getTime())
								.concat(rowStartDate.getTime())
								.concat(rowEndDate.getTime());

			var rowDataTableNode = instance.rowDataTableStack[cacheKey];

			if (!rowDataTableNode) {
				rowDataTableNode = A.Node.create(TPL_SVT_TABLE_DATA);

				var tableBody = rowDataTableNode.one(TBODY);
				var titleRowNode = instance.buildEventsTitleRow(rowDataTableNode, rowStartDate, rowEndDate);

				tableBody.append(titleRowNode);

				for (var rowDisplayIndex = 0; rowDisplayIndex < displayRows; rowDisplayIndex++) {
					var rowNode = instance.buildEventsRow(rowStartDate, rowEndDate, rowDisplayIndex);

					tableBody.append(rowNode);
				}

				instance.rowDataTableStack[cacheKey] = rowDataTableNode;
			}

			return rowDataTableNode;
		}