function (cell, createCell) {
			var $cell = $(cell);
			var colspan = Utils.colspan( cell );
			var rowspan = Utils.rowspan( cell );

			//catch the most common case early
			if (1 === colspan && 1 === rowspan) {
				return;
			}

			var $row  = $cell.parent();
			var $rows = $row.parent().children();
			var rowIdx = $row.index();
			var colIdx = $cell.index();
			var grid = Utils.makeGrid($rows);
			var gridColumn = Utils.cellIndexToGridColumn($rows, rowIdx, colIdx);
			for (var i = 0; i < rowspan; i++) {
				for (var j = (0 === i ? 1 : 0); j < colspan; j++) {
					var leftCell = Utils.leftDomCell(grid, rowIdx + i, gridColumn);
					if (null == leftCell) {
						$rows.eq(rowIdx + i).prepend(createCell());
					} else {
						$( leftCell ).after(createCell());
					}
				}
			}
			$cell.removeAttr('colspan');
			$cell.removeAttr('rowspan');
		}