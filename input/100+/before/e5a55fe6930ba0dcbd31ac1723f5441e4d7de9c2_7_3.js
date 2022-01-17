function(){

		var selectedCells = this.selectedCells;
		if ( 0 === selectedCells.length ) {
			return;
		}

		var grid = Utils.makeGrid( this.table.getRows() );
		var isSelected = function ( cellInfo ) {
			return -1 != $.inArray( cellInfo.cell, selectedCells );
		};
		var contour = Utils.makeContour( grid, isSelected );
		if (   -1 !== Utils.indexOfAnyBut( contour.top   , contour.top[0]    )
			|| -1 !== Utils.indexOfAnyBut( contour.right , contour.right[0]  )
			|| -1 !== Utils.indexOfAnyBut( contour.bottom, contour.bottom[0] )
			|| -1 !== Utils.indexOfAnyBut( contour.left  , contour.left[0]   ) ) {
			Aloha.showMessage(new Aloha.Message({
				title : i18n.t('Table'),
				text : i18n.t('table.mergeCells.notRectangular'),
				type : Aloha.Message.Type.ALERT
			}));
			return;
		}

		//sorts the cells
		this.selectedCells.sort(function(a, b){
			var aRowId = $(a).parent().prevAll('tr').length;
			var bRowId = $(b).parent().prevAll('tr').length;

			var aColId = $(a).prevAll('td, th').length;
			var bColId = $(b).prevAll('td, th').length;

			if(aRowId < bRowId){
				return -1; 
			}
			else if(aRowId > bRowId){
				return 1; 
			}
			//row id is equal
			else {
				//sort by column id
				if(aColId < bColId){
					return -1; 
				}
				if(aColId > bColId){
					return 1; 
				}
			}
		});

		var firstCell = $(this.selectedCells.shift());

		//set the initial rowspan and colspan
		var rowspan = Utils.rowspan( firstCell );
		var colspan = Utils.colspan( firstCell );

		var firstRowId = prevRowId = firstCell.parent().prevAll('tr').length;
		var firstColId = firstCell.parent().prevAll('tr').length;

		//iterate through remaining cells
		for (var i = 0; i < this.selectedCells.length; i++) {
			//get the current cell
			var curCell = $(this.selectedCells[i]);

			var curRowId = curCell.parent().prevAll('tr').length;

			//if current cell is in the same row as the first cell,
			//increase colspan
			if(curRowId == firstRowId){
				colspan += Utils.colspan( curCell );
			}
			//if they are in different rows increase the rowspan
			else {
				if(curRowId != prevRowId)
					rowspan += Utils.rowspan( curCell );
			}

			//set the current row id to previous row id
			prevRowId = curRowId;

			// get the content of the current row and append it to the first cell
			firstCell.find(":first-child").append(" " + curCell.find(":first-child").html());

			// remove the cell
			curCell.remove();
		}
		
		firstCell.attr({ 'rowspan': rowspan, 'colspan': colspan });

		//select the merged cell
		this.selectedCells = [firstCell];

		//reset flags
		this.cellSelectionMode = false; 
		this.baseCellPosition = null;
		this.lastSelectionRange = null; 
		this.selectionType = 'cell';
	}