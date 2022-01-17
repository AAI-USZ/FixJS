function (arg) {
        if (arg==='familyList') {
            var store = Ext.getStore('familyStore');
            if (!store) {
                Ext.create('chw.store.familyStore')
            }  
            // console.log(store);
            store.load();
            Ext.getCmp('familyLists').setStore(store)
        }
    }