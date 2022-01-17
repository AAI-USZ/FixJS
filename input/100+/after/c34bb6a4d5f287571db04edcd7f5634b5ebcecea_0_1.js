function () {
        Ext.create('Ext.Container', {
            id: 'viewPort',
            fullscreen: true,
            layout: 'card',
            activeItem: PAGES.loginScreen,
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
            }, {
                xclass: 'chw.view.addIllness'
            }, {
                xclass: 'chw.view.resourceList'
            }, {
                xclass: 'chw.view.resourceDetail'
            }]
        })
        console.log(Ext.getCmp('viewPort').getActiveItem());
    }