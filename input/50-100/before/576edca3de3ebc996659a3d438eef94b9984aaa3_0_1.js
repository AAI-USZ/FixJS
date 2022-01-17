function(event) {
        if(oDynamicTable.oColumnHandleData != null ) {
        	var iXChange = event.pageX - oDynamicTable.oColumnHandleData.iLastXCoordinate;

        	var oElement = oDynamicTable.oColumnHandleData.oElement;

    		jQuery(oElement).width( jQuery(oElement).width() + iXChange );
        	
        	oDynamicTable.oColumnHandleData.iLastXCoordinate = event.pageX;
        }
    }