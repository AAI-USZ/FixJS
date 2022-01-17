function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'access',
            model: 'MyApp.model.access',
            data: [
                {
                    value: 'rw',
                    text: 'Read & Write'
                },
                {
                    value: 'ro',
                    text: 'Read Only'
                },
                {
                    value: '--',
                    text: 'No Access'
                }
            ]
        }, cfg)]);
    }