function(event) {
			var instance = this;
			var target = event.target;

			if (target.test([DOT+CSS_SVT_COLGRID, DOT+CSS_SVT_TABLE_DATA_COL].join(COMMA))) {
				instance._recording = true;

				var displayRowsCount = instance._getDisplayRowsCount();
				var displayRowDaysCount = instance._getDisplayRowDaysCount();

				instance.gridCellHeight = instance[ROWS_CONTAINER_NODE].get(OFFSET_HEIGHT) / displayRowsCount;
				instance.gridCellWidth = instance[ROWS_CONTAINER_NODE].get(OFFSET_WIDTH) / displayRowDaysCount;

				var eventXY = instance._offsetXY([event.pageX, event.pageY], -1);

				instance.lassoStartPosition = instance.lassoLastPosition = instance._findPosition(eventXY);

				instance.renderLasso(instance.lassoStartPosition, instance.lassoLastPosition);

				instance[ROWS_CONTAINER_NODE].unselectable();
			}
		}