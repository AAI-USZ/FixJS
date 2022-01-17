function(event) {
        if(oDynamicTable.oColumnHandleData != null ) {
        	var iXChange = event.pageX - oDynamicTable.oColumnHandleData.iLastXCoordinate;

        	var oElementLeft = oDynamicTable.oColumnHandleData.oElementLeft;
        	
        	var oElementRight = oDynamicTable.oColumnHandleData.oElementRight;
        	console.log( iXChange );

    		jQuery(oElementLeft).width( jQuery(oElementLeft).width() + iXChange );
    		jQuery(oElementRight).width( jQuery(oElementRight).width() - iXChange );
        	
        	oDynamicTable.oColumnHandleData.iLastXCoordinate = event.pageX;
        }
    }