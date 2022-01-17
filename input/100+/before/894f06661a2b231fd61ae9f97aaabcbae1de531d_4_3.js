function () {
        Ext.getStore('patientStore').sort('display');
        this.getSortPanel().hide();
    }