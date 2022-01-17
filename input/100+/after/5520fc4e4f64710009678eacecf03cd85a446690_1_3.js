function (arg) {
        if (arg) {
            var active = Ext.getCmp('viewPort').getActiveItem();
            // console.log(active.id);
            if (active.getActiveItem()===PAGES.loginScreen) {
                this.doLogin(arg);
            } else if (active.id==='ext-panel-5'){ //add a Family
                this.doAdd('family', arg);
            } else if (active.id==='ext-familyDetails-1'){ //Go to adding patient page. Here the family name and family id is being forwarded
                Ext.ComponentQuery.query('AddPatient #familyField')[0].setValue(Ext.ComponentQuery.query('familyDetails #familyTitle')[0].getTitle());
                Ext.ComponentQuery.query('AddPatient #familyId')[0].setValue(Ext.ComponentQuery.query('familyDetails #familyIdLabel')[0].getValue())
                Ext.getCmp('viewPort').setActiveItem(PAGES.addPatient);
            } else if (active.id==='ext-AddPatient-1'){ //Add a patient
                this.doAdd('patient', arg);
            } else if (active.id==='ext-addIllness-1'){
                this.doAdd('illness', arg)
            }
        }
    }