function () {
        //Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", Ext.emptyFn);
        this.totalPatients = Ext.getStore('patientStore').getCount();
        Ext.getStore('patientStore').each(this.addToDoctor);
        form_num = 0;
        lab_num = 0;
    }