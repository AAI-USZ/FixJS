function(x){
        Ext.getCmp('prescriptionPatientName').setValue(x.display)
        //below its commented as the identifier are not sent in patient search results
        //Ext.getCmp('prescriptionPatientId').setValue(x.identifier)
        if(x.age != 0)Ext.getCmp('prescriptionPatientAge').setValue(x.age)
        else Ext.getCmp('prescriptionPatientAge').setValue(null)
        Ext.getCmp('prescriptionPatientGender').setValue(x.gender)
        this.getDrugOrders(x.uuid)
    }