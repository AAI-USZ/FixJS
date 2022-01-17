function( event ) {
        if(oDynamicTable.oTableDragHandleData != null ) {
        	var iXChange = event.pageX - oDynamicTable.oTableDragHandleData.oStartCoordinate.x;
        	var iYChange = event.pageY - oDynamicTable.oTableDragHandleData.oStartCoordinate.y;
        	
        	if( iXChange != 0 ){
        		//TODO set the left value = left + iXChange
        	}
        	
        	if( iYChange != 0 ){
        		//TODO set the top value = top + iYChange
        	}

        	
        	oDynamicTable.oTableDragHandleData.oStartCoordinate.x = event.pageX;
        	oDynamicTable.oTableDragHandleData.oStartCoordinate.y = event.pageY;
        }
    }