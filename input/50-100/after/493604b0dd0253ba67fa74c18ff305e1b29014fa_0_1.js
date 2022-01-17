function(selectionmodel) {
        if(this.includeRemove) {
            if(selectionmodel.getSelection().length == 0) {
                this.down('#removeButton').disable();
            } else {
                this.down('#removeButton').enable();
            }
        }
    }