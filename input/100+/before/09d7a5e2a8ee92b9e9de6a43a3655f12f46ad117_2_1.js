function() {
		var 
			colIDs = [],
			cellToDelete = [],
			// get all rows to iterate
		    rows = this.getRows(),
			that = this,
			changeColspan = [],
			focusColID,
			cells,
			cellInfo;
		
		var grid = Utils.makeGrid(rows);
		var selectColWidth = 1; //width of the select-row column

		// if all columns should be deleted, remove the WHOLE table
		// delete the whole table
		if ( this.selection.selectedColumnIdxs.length == grid[0].length - selectColWidth ) {
			
			Dialog.confirm({
				title : i18n.t('Table'),
				text : i18n.t('deletetable.confirm'),
				yes : function () {
					that.deleteTable();
				}
			});
			
		} else {
			
			colIDs.sort(function(a,b) {return a - b;} );
			
// TODO check which cell should be focused after the deletion
//			focusColID = colIDs[0];
//			if ( focusColID > (this.numCols - colIDs.length) ) {
//				focusColID --;
//			}

			//TODO there is a bug that that occurs if a column is
			//selected and deleted, and then a column with a greater
			//x-index is selected and deleted.

			//sorted so we delete from right to left to minimize interfernce of deleted rows
			var gridColumns = this.selection.selectedColumnIdxs.sort(function(a,b){ return b - a; });
			for (var i = 0; i < gridColumns.length; i++) {
				var gridColumn = gridColumns[i];
				for (var j = 0; j < rows.length; j++) {
					var cellInfo = grid[j][gridColumn];
					if ( ! cellInfo ) {
						//TODO this case occurred because of a bug somewhere which should be fixed
						continue;
					}
					if ( 0 === cellInfo.spannedX ) {
						if (1 < cellInfo.colspan) {
							var nCell = this.newActiveCell().obj;
							jQuery( cellInfo.cell ).after(nCell);
							nCell.attr('rowspan', cellInfo.rowspan);
							nCell.attr('colspan', cellInfo.colspan - 1);
						}
						jQuery( cellInfo.cell ).remove();
					} else {
						jQuery( cellInfo.cell ).attr('colspan', cellInfo.colspan - 1);
					}
					//ensures that always 0 === cellInfo.spannedY
					j += cellInfo.rowspan - 1;
				}
				//rebuild the grid to reflect the table structure change
				grid = Utils.makeGrid(rows);
			}

			// reduce the attribute storing the number of rows in the table
			this.numCols -= colIDs.length;

			// IE needs a timeout to work properly
			window.setTimeout( function() {
				var lastCell = jQuery( rows[1].cells[ focusColID +1 ] );
				lastCell.focus();
			}, 5);

			this.selection.unselectCells();
		}
	}