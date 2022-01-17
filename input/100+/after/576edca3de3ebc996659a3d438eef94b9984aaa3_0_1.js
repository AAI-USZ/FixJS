function( event ) {
        if(oDynamicTable.oTableResizeHandleData != null ) {
        	var iXChange = event.pageX - oDynamicTable.oTableResizeHandleData.oStartCoordinate.x;
        	var iYChange = event.pageY - oDynamicTable.oTableResizeHandleData.oStartCoordinate.y;
        	
        	var sBoundaries = oDynamicTable.oTableResizeHandleData.sBoundaries;
        	
        	if( iXChange != 0 ){
	        	if( sBoundaries.indexOf('e') != -1 ){
	        		oDynamicTable.oTableElement.width( oDynamicTable.oTableResizeHandleData.oStartSize.iWidth + iXChange );
	        	}
        	}
        	
        	if( iYChange != 0 ){
        		if( sBoundaries.indexOf('s') != -1 ){
	        		oDynamicTable.oTableElement.height( oDynamicTable.oTableResizeHandleData.oStartSize.iHeight + iYChange );
        		}
        	}
        }
    }