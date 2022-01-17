function(event) {
        if(oDynamicTable.oColumnHandleData != null ) {
        	var iXChange = event.pageX - oDynamicTable.oColumnHandleData.iStartXCoordinate;

        	var oElement = oDynamicTable.oColumnHandleData.oElement;

    		jQuery(oElement).width( oDynamicTable.oColumnHandleData.iStartWidth + iXChange );
        }
    }