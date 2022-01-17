function (list, item, index) {
        if (!this.patientSummary) {
            this.patientSummary = Ext.create('Screener.view.PatientSummary');
        }
        Ext.getCmp('name').setValue(Ext.getStore('patientStore').getData().all[item].data.display);
        Ext.Viewport.add(this.patientSummary);
        Ext.getCmp('patientSummary').setHidden(false);
        var uuid = Ext.getStore('patientStore').getData().all[item].data.uuid;
        var store = Ext.create('Screener.store.PatientSummary');
        store.getProxy().setUrl(HOST + '/ws/rest/v1/encounter?patient=' + uuid);
        store.load({
            callback: function (records, operation, success) {
                // the operation object contains all of the details of the load operation
                for(i=1;i<=5;i++) {
                Ext.getCmp(i).setHtml("");
                Ext.getCmp(i).setHtml(store.last().raw.obs[i-1].display);
                }
            },
            scope: this
        });
    }