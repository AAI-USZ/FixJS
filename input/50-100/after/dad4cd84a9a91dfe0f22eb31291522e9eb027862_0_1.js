function(btn) {
        var form = this.getForm(), 
            record = form.getForm().getRecord(),
            grid = this.getGrid(),
            selModel = grid.getSelectionModel();

        form.commit();

        if (form.addMode) {
            grid.store.add(record);
        }

        form.loadRecord(record); //allows form to no longer be dirty
        selModel.deselect(record); //circumvent ExtJS bug
        selModel.select(record); //make sure this record is selected
    }