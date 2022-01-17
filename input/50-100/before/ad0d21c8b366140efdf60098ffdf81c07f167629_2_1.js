function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'access',
            model: 'MyApp.model.Access',
            data: [
                {
                    value: 'RW',
                    text: 'Read & Write'
                },
                {
                    value: 'RO',
                    text: 'Read Only'
                },
                {
                    value: '--',
                    text: 'No Access'
                }
            ]
        }, cfg)]);
    }