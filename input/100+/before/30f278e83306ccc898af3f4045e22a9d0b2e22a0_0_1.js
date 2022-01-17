function(e) {
        if(oDynamicTable.oColumnHandleData != null ) {
            jQuery(oDynamicTable.columnHandlePressed).width(startWidth+(e.pageX-startX));
        }
    }