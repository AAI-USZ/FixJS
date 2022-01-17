function( oCell ){
		var iCellIndex = fnGetColumnIndex( oCell );
		
		return jQuery(oCell).parent().children()[iCellIndex + 1];
	}