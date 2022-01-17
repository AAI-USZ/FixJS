function( event ) {
        if(oDynamicTable.oTableResizeHandleData != null ) {
        	var iXChange = event.pageX - oDynamicTable.oTableResizeHandleData.iLastCoordinate.x;
        	var iYChange = event.pageY - oDynamicTable.oTableResizeHandleData.iLastCoordinate.y;
        	
        	var sBoundaries = oDynamicTable.oTableResizeHandleData.sBoundaries;
        	
        	if( iXChange != 0 ){
	        	if( sBoundaries.indexOf('e') != -1 ){
	        		oDynamicTable.oTableElement.width( oDynamicTable.oTableElement.width() + iXChange );
	        	}
        	}
        	
        	if( iYChange != 0 ){
        		if( sBoundaries.indexOf('s') != -1 ){
	        		oDynamicTable.oTableElement.height( oDynamicTable.oTableElement.height() + iYChange );
        		}
        	}

        	
        	oDynamicTable.oTableResizeHandleData.iLastCoordinate.x = event.pageX;
        	oDynamicTable.oTableResizeHandleData.iLastCoordinate.y = event.pageY;
        }
    }