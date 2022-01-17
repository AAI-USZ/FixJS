function () {
        Ext.getStore('patientStore').sort('time');
        var i;
        for (i = 0; i < Ext.ComponentQuery.query('ListView #sortName').length; i++) {
            Ext.ComponentQuery.query('ListView #sortName')[i].setUi('normal');
        }
        for (i = 0; i < Ext.ComponentQuery.query('ListView #sortBMI').length; i++) {
            Ext.ComponentQuery.query('ListView #sortBMI')[i].setUi('normal');
        }
        for (i = 0; i < Ext.ComponentQuery.query('ListView #sortFIFO').length; i++) {
            Ext.ComponentQuery.query('ListView #sortFIFO')[i].setUi('decline');
        }

    }