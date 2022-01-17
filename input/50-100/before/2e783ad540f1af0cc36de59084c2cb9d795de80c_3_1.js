function () {
        //  a new pop window for new patient form
        var winObj = Ext.create('Ext.window.Window', {
            width: 868,
            height: 225,
            maximizable: false,
            modal: true,
            items: [{
                    xtype: 'addPatient'
                }]
        }).show();


    }