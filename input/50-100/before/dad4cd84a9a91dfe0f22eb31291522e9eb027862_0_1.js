function(btn) {
        var form = this.getForm(), 
            record = form.getForm().getRecord(),
            grid = this.getGrid();

        form.commit();

        if (form.addMode) {
            form.setAddMode(false);
            grid.store.add(record);
            grid.getSelectionModel().select(record);
        }
        form.setReadOnly(true);
    }