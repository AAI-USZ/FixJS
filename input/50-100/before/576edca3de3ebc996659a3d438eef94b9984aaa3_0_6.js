function( event ) {
        if(oDynamicTable.oTableDragHandleData != null ) {
        	var iXChange = event.pageX - oDynamicTable.oTableDragHandleData.iLastCoordinate.x;
        	var iYChange = event.pageY - oDynamicTable.oTableDragHandleData.iLastCoordinate.y;
        	
        	if( iXChange != 0 ){
        		//TODO set the left value = left + iXChange
        	}
        	
        	if( iYChange != 0 ){
        		//TODO set the top value = top + iYChange
        	}

        	
        	oDynamicTable.oTableDragHandleData.iLastCoordinate.x = event.pageX;
        	oDynamicTable.oTableDragHandleData.iLastCoordinate.y = event.pageY;
        }
    }