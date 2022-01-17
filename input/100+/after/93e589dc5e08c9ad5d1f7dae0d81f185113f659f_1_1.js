function (list,record) {
        if(list==='family'){
            // set all family details before transition
            // Ext.ComponentQuery.query('familyDetails #familyAddressLabel')[0].setHtml('<div style="font-size:13px;">'+record.get('familyAddress')+'</div>');
            Ext.ComponentQuery.query('familyDetails #familyTitle')[0].setTitle(record.get('familyName'));
            // Ext.ComponentQuery.query('familyDetails #familyDescripLabel')[0].setHtml('<div style="text-align:center;"><br><i>'+record.get('familyDescrip')+'</i></div>');
            // loading family member list
            var patientStore = Ext.getStore('patients');
            if (!patientStore) {
                Ext.create('chw.store.patients')
            }
            
            var familyId = record.get('familyId');
            console.log(familyId);
            //Filtering the list by family id
            patientStore.filter('familyId',familyId)
            patientStore.onAfter('load',function(){
                console.log(patientStore)
                console.log('loaded') 
                Ext.getCmp('familyMembersList').setStore(patientStore);
                Ext.getCmp('viewPort').setActiveItem(PAGES.familyDetails)
            });
            patientStore.load();
        } else if (list==='illness'){
            // filter and fetch a list of all patients with that illness
            // display all patients with that illness
        }
    }