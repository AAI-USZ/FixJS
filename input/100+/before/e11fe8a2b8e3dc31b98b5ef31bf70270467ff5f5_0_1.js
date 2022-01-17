function(json) {
        checkError(json);

        cursorIds = [];
        /* We need to keep record of which show the cursor belongs to
         * in the case where more than one show is displayed in the show builder
         * because header and footer rows have the same id
         */ 
        showInstanceIds = [];
        cursors = $(".cursor-selected-row");
        for (i = 0; i < cursors.length; i++) {
            cursorIds.push(($(cursors.get(i)).attr("id")));
            showInstanceIds.push(($(cursors.get(i)).attr("si_id")));
        }
        oSchedTable.fnDraw();
        
        mod.enableUI();
    }