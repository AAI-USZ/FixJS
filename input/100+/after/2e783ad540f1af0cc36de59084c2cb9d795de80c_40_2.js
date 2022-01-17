function (list_reg, list_scr, list_out, k) {
        var store_reg = Ext.create('Screener.store.PostLists');
        var store_scr = Ext.create('Screener.store.PostLists');
        var store_out = Ext.create('Screener.store.PostLists')
        store_reg.add(list_reg);
        store_scr.add(list_scr);
        store_out.add(list_out);
        store_reg.sync();
        store_scr.sync();
        store_out.sync();
        store_reg.on('write', function () {
            k = k + 1;
            if (k == 3) {
                this.finalPatientList(store_reg, store_scr, store_out);
            }
        }, this);
        store_scr.on('write', function () {
            k = k + 1;
            if (k == 3) {
                this.finalPatientList(store_reg, store_scr, store_out);
            }
        }, this);
        store_out.on('write', function () {
            k = k + 1;
            if (k == 3) {
                this.finalPatientList(store_reg, store_scr, store_out);
            }
        }, this);
        var a = [store_reg, store_scr, store_out];
        return a;
    }