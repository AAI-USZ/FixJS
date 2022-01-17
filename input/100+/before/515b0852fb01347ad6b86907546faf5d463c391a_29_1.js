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
                    text: 'Logged in as ' + username
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'button',
                    width: 60,
                    text: 'Sign Out'
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
            id: 'mainLabArea',
            activeItem: 0,
            layout: {
                type: 'card'
            },
            margin: '2 0 2 0',
            region: 'center',
            items: [{
                xtype: 'Home'
            }, {
                xtype: 'PaperEntry1'
            }, {
                xtype: 'PaperEntry2'
            }, {
                xtype: 'PaperEntry3'
            }, {
                xtype: 'PaperEntry4'
            }, {
                xtype: 'BatchApproval'
            }, {
                xtype: 'QueueStatus'
            }, {
                xtype: 'ReportDelivery1'
            }, {
                xtype: 'ReportDelivery2'
            }, {
                xtype: 'ReportDelivery3'
            }, {
                xtype: 'ReportDelivery4'
            }, {
                xtype: 'ReportDelivery5'
            }]
        };
        this.callParent();
    }