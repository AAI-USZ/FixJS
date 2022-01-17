function () {
        Ext.create('Ext.Container', {
            id: 'viewPort',
            fullscreen: true,
            layout: 'card',
            activeItem: 0,
            items: [{
                xclass: 'chw.view.loginScreen'
            }, {
                xclass: 'chw.view.familyList'
            }, {
                xclass: 'chw.view.diseaseList'
            }, {
                xclass: 'chw.view.familyDetails'
            }, {
                xclass: 'chw.view.patientDetails'
            }, {
                xclass: 'chw.view.visitDetails'
            }, {
                xclass: 'chw.view.inventoryList'
            }, {
                xclass: 'chw.view.inventoryDetails'
            }, {
                xclass: 'chw.view.addOptions'
            }, {
                xclass: 'chw.view.addFamily'
            }, {
                xclass: 'chw.view.addPatient'
            }]
        })
    }