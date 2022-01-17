function (step, arg) {
        if (arg) {
            if (step === 'app') {
                this.toPage(PAGES.ADD_APP)
            } else if (step === 'reg') {
                this.toPage(PAGES.ADD_REG)
            } else if (step === 'rem') {
                this.toPage(PAGES.ADD_REM)
            } else if (step === 'register') {
                var fname = Ext.getCmp('first_reg').getValue();
                var lname = Ext.getCmp('last_reg').getValue();
                var phone = Ext.getCmp('phone_reg').getValue();
                var village = Ext.getCmp('village_reg').getValue();
                var radioform = Ext.getCmp('ext-formpanel-5').saveForm();
                var gender = radioform.radiogroup.charAt(0);
                var bday = Ext.getCmp('bday').getValue();

                if (fname == '' || lname == '' || phone == '' || village == '' || gender == '' || bday == '') {
                    Ext.Msg.alert("Error", "Please fill in all fields")
                } else {
                    
                    var offlineStore = Ext.getStore('offlineRegisterStore');
                    if(!offlineStore){
                        offlineStore = Ext.create('mUserStories.store.offlineRegisterStore')
                    }
                   
                    var up_Model = Ext.create('mUserStories.model.upPersonModel',{
                        names: [{
                            givenName: fname,
                            familyName: lname
                        }],
                        gender: gender,
                        birthdate: bday,
                        addresses: [{
                            cityVillage: village
                        }]
                    });
                    
                    offlineStore.add(up_Model);
                    offlineStore.sync();
                    
                    console.log('stored offline');
                    
                    Ext.getCmp('ext-formpanel-5').reset();
                    this.doDownload();
                    Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)    
                }
            } else if (step === 'reminder') {
            // TODO: validate all fields
            // TODO: add 'other' option
            }
        } else {
            // TODO: doReturn()
            this.doDownload();
            this.toPage(PAGES.PATIENT_LIST)
        }
    }