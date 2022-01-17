function (step, arg) {
        if (arg) {
            if (step === 'app') {
                Ext.getCmp('viewPort').setActiveItem(PAGES.ADD_APP)
            } else if (step === 'reg') {
                Ext.getCmp('viewPort').setActiveItem(PAGES.ADD_REG)
            } else if (step === 'rem') {
                Ext.getCmp('viewPort').setActiveItem(PAGES.ADD_REM)
            } else if (step === 'register') {
                var fname = Ext.getCmp('first_reg').getValue();
                var lname = Ext.getCmp('last_reg').getValue();
                var phone = Ext.getCmp('phone_reg').getValue();
                var village = Ext.getCmp('village_reg').getValue();
                var radioform = Ext.getCmp('ext-formpanel-5').saveForm();
                var gender = radioform.radiogroup.charAt(0);
                console.log(gender);
                var bday = Ext.getCmp('bday').getValue();

                if (fname == '' || lname == '' || phone == '' || village == '' || gender == '' || bday == '') {
                    Ext.Msg.alert("Error", "Please fill in all fields")
                } else {
                    var up_store = Ext.create('mUserStories.store.upPersonStore');
                    var up_Model = Ext.create('mUserStories.model.upPersonModel', {
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
                    //Adding registration details into local storage (a store)
                    up_store.add(up_Model);
                    //REST call for creating a Person
                    up_store.sync();
                    up_store.on('write', function () {
                        console.log('Stored locally, calling identifier type');
                        // Now that Person is created, send request to create Patient
                        this.getidentifierstype(up_store.getAt(0).getData().uuid)
                    }, this)
                }
            } else if (step === 'reminder') {
            // TODO: validate all fields
            // TODO: add 'other' option
            }
        } else {
            // TODO: doReturn()
            this.doDownload();
            Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
        }
    }