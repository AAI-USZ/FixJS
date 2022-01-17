function(step,arg){
        if(arg){
            if(step==='family'){
                //add family
                var name = Ext.getCmp('familyName').getValue();
                var address = Ext.getCmp('address').getValue();
                var description = Ext.getCmp('description').getValue();
                
                if(familyName=='' || address==''){
                    Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.fillAllFieldsError'));
                }else{
                    var familyStore = Ext.getStore('families');
                    if(!familyStore){
                        familyStore = Ext.create('chw.store.families');
                    }
                    var familyCount = familyStore.getCount();
                    familyCount = familyCount+1;
                    var familyModel = Ext.create('chw.model.family',{
                        familyName: name,
                        familyAddress: address,
                        familyDescrip: description,
                        familyId: familyCount,
                        familyLatitude: 25,
                        familyLongitude: 25,
                        familyImage: 'resources/home.png',
                        familyDistance: 20
                    });
                    
                    familyStore.add(familyModel);
                    familyStore.sync();
                    //                    familyStore.on('write',function(){
                    console.log('Added family locally');
                    Ext.getCmp('familyName').reset();
                    Ext.getCmp('address').reset();
                    Ext.getCmp('description').reset();
                    Ext.getCmp('viewPort').setActiveItem(PAGES.familyList);
                //                    })
                }
            } else if(step==='patient') {
                //add patient
                var familyIdVal = Ext.ComponentQuery.query('AddPatient #familyId')[0].getValue();
                var firstNameVal = Ext.ComponentQuery.query('AddPatient #firstName')[0].getValue();
                var lastNameVal = Ext.ComponentQuery.query('AddPatient #lastName')[0].getValue();
                var radioform = Ext.getCmp('ext-AddPatient-1').saveForm();
                var birthDay = Ext.ComponentQuery.query('AddPatient #bday')[0].getValue();
                
                if(firstNameVal=='' || lastNameVal== '' || !radioform.radiogroup){
                    Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.fillAllFieldsError'));
                }else{
                    //Move ahead with adding the patient
                    var gender = radioform.radiogroup.charAt(0);
                    var patientStore = Ext.getStore('patients');
                    if(!patientStore){
                        Ext.create('chw.store.patients');
                    }
                    var patientCount = patientStore.getCount();
                    patientCount = patientCount+1;
                    var patientModel = Ext.create('chw.model.patient',{
                        familyId: familyIdVal,
                        patientId: patientCount,
                        firstName: firstNameVal,
                        familyName: lastNameVal,
                        patientGender: gender,
                        birthDate: birthDay
                    });
                    
                    patientStore.add(patientModel);
                    patientStore.sync();
                    Ext.getCmp('ext-AddPatient-1').reset();
                    Ext.getCmp('viewPort').setActiveItem(PAGES.familyDetails);
                }
            } else if (step==='illness') {}
        }
    }