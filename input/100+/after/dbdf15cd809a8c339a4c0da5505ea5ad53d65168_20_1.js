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
                    action: 'register'
                }, {
                    xtype: 'button',
                    height: 35,
                    margin: '10 0 13 0',
                    width: 300,
                    text: 'Search Registered Patient',
                    action: 'search'
                }]
            }]
        };
        this.callParent();
    }