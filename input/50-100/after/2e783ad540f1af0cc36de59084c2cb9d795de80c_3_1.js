function () {
        var drugStore = this.getStore('orderStore');
        var x = Ext.getCmp('prescribedDrugs').getSelectionModel().getSelection()
        if(x[0].data.unitprice != null && x[0].data.qty != null){
            x[0].data.itemprice = x[0].data.unitprice*x[0].data.qty;
        }
        drugStore.sync();
    }