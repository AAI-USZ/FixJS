function(){

		var selectedCells = this.selectedCells;
		if ( 0 === selectedCells.length ) {
			return;
		}

		var isSelected = function ( cellInfo ) {
			return -1 != $.inArray( cellInfo.cell, selectedCells );
		};

		var grid = Utils.makeGrid( this.table.getRows() );
		var contour = Utils.makeContour( grid, isSelected );

		if ( ! isMergeable( grid, contour, isSelected ) ) {
			Aloha.showMessage(new Aloha.Message({
				title : i18n.t('Table'),
				text : i18n.t('table.mergeCells.notRectangular'),
				type : Aloha.Message.Type.ALERT
			}));
			return;
		}

		var selectedRect = getRectFromContour( contour );
		var $firstCell = $( grid[ selectedRect.top ][ selectedRect.left ].cell );
		var $firstContainer = $( TableCell.getContainer( $firstCell.get( 0 ) ) );

		Utils.walkGridInsideRect( grid, selectedRect, function ( cellInfo, x, y ) {
			if (   x - cellInfo.spannedX === selectedRect.left
				&& y - cellInfo.spannedY === selectedRect.top ) {
				return;
			}
			var cell = cellInfo.cell;
			var contents = $( TableCell.getContainer( cell ) ).contents();
			// only append the delimiting space if there is some non-whitespace
			for ( var i = 0; i < contents.length; i++ ) {
				if (   "string" !== typeof contents[i]
				    || "" !== $.trim( contents[i] ) ) {
					$firstContainer.append( " " );
					$firstContainer.append( contents );
					break;
				}
			}
			$( cell ).remove();
		});

		$firstCell.attr({ 'rowspan': selectedRect.bottom - selectedRect.top,
						  'colspan': selectedRect.right  - selectedRect.left });

		//select the merged cell
		this.selectedCells = [ $firstCell.get( 0 ) ];

		//reset flags
		this.cellSelectionMode = false; 
		this.baseCellPosition = null;
		this.lastSelectionRange = null; 
		this.selectionType = 'cell';
	}