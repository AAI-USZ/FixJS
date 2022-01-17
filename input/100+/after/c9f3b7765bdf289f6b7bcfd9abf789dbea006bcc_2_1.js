function () {
        this.items = {
            border: 0,
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'form',
                border: 0,
                layout: {
                    align: 'center',
                    pack: 'center',
                    type: 'vbox'
                },
                bodyPadding: 10,
                items: [{
                    xtype: 'image',
                    height: 130,
                    margin: '0 0 20 0',
                    width: 130,
                    src: '../resources/img/logo.png'
                }, {
                    xtype: 'button',
                    height: 35,
                    margin: '10 0 13 0',
                    width: 300,
                    text: 'Register New Patient',
                    handler: function () {
                        var l = Ext.getCmp('mainRegArea').getLayout();
                        l.setActiveItem(REG_PAGES.REG_1.value); //Going to Registration Part-1 Page
                    }
                }, {
                    xtype: 'button',
                    height: 35,
                    margin: '10 0 13 0',
                    width: 300,
                    text: 'Search Registered Patient',
                    handler: function () {
                        var l = Ext.getCmp('mainRegArea').getLayout();
                        l.setActiveItem(REG_PAGES.SEARCH_1.value); //Going to Search Part-1 Page
                    }
                }]
            }]
        };
        this.callParent();
    }