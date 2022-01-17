function() {
        // create the load mask
        // this.loadMask = Ext.create('Ext.LoadMask', this.getDataViewContainer(), {
        //     msg: 'Waiting for draft start...'
        // });

        // disable the dataview so the mask will show up
        // this.getDataView().setDisabled(true);
        this.getDataView().doComponentLayout();
        //this.getDataView().hide().show();
    }