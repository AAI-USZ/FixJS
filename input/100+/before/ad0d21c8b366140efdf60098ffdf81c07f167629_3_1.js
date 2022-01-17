function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'virtportal',
            model: 'MyApp.model.VirtPortal',
            data: [
                {
                    targetid: -1,
                    targetname: 'default',
                    includeip: '10.10.1.201'
                },
                {
                    targetid: -1,
                    targetname: 'default',
                    excludesource: '10.10.1.1'
                },
                {
                    targetid: 0,
                    targetname: 'iqn:0',
                    includeip: '10.10.1.222'
                }
            ],
            groupField: 'targetname',
            sorters: {
                direction: 'DESC',
                property: 'includeip'
            }
        }, cfg)]);
    }