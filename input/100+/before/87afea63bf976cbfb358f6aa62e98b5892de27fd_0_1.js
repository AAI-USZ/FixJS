function(json) {
        checkError(json);

        cursorIds = [];
        
        /* We need to keep record of which show the cursor belongs to
         * in the case where more than one show is displayed in the show builder
         * because header and footer rows have the same id
         */ 
        showInstanceIds = [];
        
        /* Keeps track if the row is a footer. We need to do this because
         * header and footer rows have the save cursorIds and showInstanceId
         * so both will be selected in the draw callback
         */ 
        headerFooter = [];
        
        cursors = $(".cursor-selected-row");
        for (i = 0; i < cursors.length; i++) {
            cursorIds.push(($(cursors.get(i)).attr("id")));
            showInstanceIds.push(($(cursors.get(i)).attr("si_id")));
            if ($(cursors.get(i)).hasClass("sb-footer")) {
                headerFooter.push("f");	
            } else {
                headerFooter.push("n");	
            }
        }
        oSchedTable.fnDraw();
        
        mod.enableUI();
    }