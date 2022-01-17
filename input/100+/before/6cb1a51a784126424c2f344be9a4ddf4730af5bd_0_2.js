function(config) {
        config = Ext.applyIf(config||{}, {
            componentType: 'NortelTopology',
            autoExpandColumn: 'sysname',
            fields: [
                {name: 'uid'},
                {name: 'severity'},
                {name: 'name'},
                {name: 'status'},
                {name: 'hasMonitor'},
                {name: 'monitor'},
                {name: 'localint'},
                {name: 'macaddr'},
                {name: 'chassistype'},
                {name: 'localseg'},
                {name: 'sysname'},
                {name: 'curstate'},
            ],
            columns: [{
                id: 'severity',
                dataIndex: 'severity',
                header: _t('Events'),
                renderer: Zenoss.render.severity,
                width: 60,
            },{
                id: 'sysname',
                dataIndex: 'sysname',
                header: _t('Remote Device'),
                renderer: render_link,
            },{
                id: 'name',
                dataIndex: 'name',
                header: _t('IP Address'),
            },{
                id: 'macaddr',
                dataIndex: 'macaddr',
                header: _t('Mac Address'),
                sortable: true,
                width: 120,
            },{
                id: 'localint',
                dataIndex: 'localint',
                header: _t('Local Interface'),
                renderer: render_link,
            },{
                id: 'chassistype',
                dataIndex: 'chassistype',
                header: _t('Chassis Type'),
                sortable: true,
                width: 160,
            },{
                id: 'localseg',
                dataIndex: 'localseg',
                header: _t('Local Segment'),
                sortable: true,
            },{
                id: 'curstate',
                dataIndex: 'curstate',
                header: _t('State'),
                sortable: true,
                width: 120,
            },{
                id: 'monitor',
                dataIndex: 'monitor',
                header: _t('Monitored')
            }]
        });
        ZC.NortelTopologyPanel.superclass.constructor.call(this, config);
    }