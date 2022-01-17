function (record) {
        Ext.getCmp('title_det').setTitle(record.get('familyName') + ', ' + record.get('givenName'))
        // navigate to details for specific patient and populate fields
        Ext.getCmp('first_det').setValue(record.get('givenName'));
        Ext.getCmp('last_det').setValue(record.get('familyName'));
        Ext.getCmp('address_det').setValue(record.get('cityVillage'));
        Ext.getCmp('gender_det').setValue(record.get('gender'));
        Ext.getCmp('bday_det').setValue(record.get('birthdate'))
        // change to next page
        Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_DET)
    }