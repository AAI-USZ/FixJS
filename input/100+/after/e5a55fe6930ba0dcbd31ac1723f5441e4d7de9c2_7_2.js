function ( cellInfo, x, y ) {
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
		}