function () {
        this.items = {
            dockedItems: [{
                xtype: 'toolbar',
                height: 40,
                dock: 'top',
                items: [{
                    xtype: 'image',
                    height: 35,
                    width: 40,
                    src: '../resources/img/icon.png'
                }, {
                    xtype: 'tbfill'
                }, {
                    xtype: 'tbtext',
                    text: 'You are logged in as ' + username
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'button',
                    width: 60,
                    text: 'Log Out',
                }]
            }, {
                dock: 'bottom',
                xtype: 'toolbar',
                height: 40,
                items: [{
                    xtype: 'tbspacer',
                    width: 380
                }, {
                    xtype: 'image',
                    height: 35,
                    width: 40,
                    src: '../resources/img/icon.png'
                }]
            }],
            width: 800,
            id: 'mainRegArea',
            activeItem: REG_PAGES.HOME.value,
            layout: {
                type: 'card'
            },
            margin: '2 0 2 0',
            region: 'center',
            items: [{
                xtype: REG_PAGES.HOME.name
            }, {
                xtype: REG_PAGES.REG_1.name
            }, {
                xtype: REG_PAGES.REG_2.name
            }, {
                xtype: REG_PAGES.REG_CONFIRM.name
            }, {
                xtype: REG_PAGES.REG_BMI.name
            }, {
                xtype: REG_PAGES.SEARCH_1.name
            }, {
                xtype: REG_PAGES.SEARCH_2.name
            }, {
                xtype: REG_PAGES.SEARCH_CONFIRM.name
            }]
        };
        this.callParent();
    }