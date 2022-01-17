function(json) {
        checkError(json);

        mod.getSelectedCursors(); 
        oSchedTable.fnDraw();
        
        mod.enableUI();
    }