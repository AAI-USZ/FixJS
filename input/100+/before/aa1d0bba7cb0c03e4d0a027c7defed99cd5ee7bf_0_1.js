function (arg) {
        if (arg==='familyList') {
            var store = Ext.getStore('familyStore');
            if (!store) {
                Ext.create('chw.store.familyStore')
            }  
            // console.log(store);
            store.load();
            Ext.getCmp('familyLists').setStore(store)
        }else if(arg==='familyDetails'){
            var store = Ext.getStore('patientStore');
            if(!store){
                Ext.create('chw.store.familyDetails')
            }
            console.log(store)
            store.load();
            Ext.getCmp('familyMembersLIst').setStore(store);
        }
    }